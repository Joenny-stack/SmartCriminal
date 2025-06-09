import psycopg2

# Connect to database
conn = psycopg2.connect(
    dbname='smartcrime_db',
    user='postgres',
    password='admin',
    host='localhost',
    port=5432
)
cursor = conn.cursor()

def get_valid_crime_grades():
    cursor.execute("""
        SELECT pg_get_constraintdef(c.oid)
        FROM pg_constraint c
        JOIN pg_class t ON c.conrelid = t.oid
        WHERE t.relname = 'tblcriminals' AND conname LIKE '%crime_grade_check%';
    """
    )
    result = cursor.fetchone()
    if result:
        constraint_def = result[0]
        # Extract values from: CHECK ((crime_grade = ANY (ARRAY['Low'::text, 'Moderate'::text, 'High'::text])))
        if "ARRAY[" in constraint_def:
            values = constraint_def.split("ARRAY[")[-1].split("]")[0]
            return [v.strip().strip("'") for v in values.split(",")]
    return []

if __name__ == "__main__":
    valid_grades = get_valid_crime_grades()
    print("Valid crime grades:", valid_grades)
