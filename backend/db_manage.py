import sqlite3

def init_connection():
    connection = sqlite3.connect("info/digital_assessment.db")
    cur = connection.cursor()
    return cur, connection

def close_connection(cur, connection):
    cur.close()
    connection.close()


def create_User_table():
    cur, connection = init_connection()
    cur.execute('''CREATE TABLE IF NOT EXISTS Users (
                            first_name VARCHAR(30),
                            last_name VARCHAR(30),
                            mobile_phone VARCHAR(20),
                            email VARCHAR(150),
                            name VARCHAR(100),
                            size VARCHAR(30), 
                            address VARCHAR(100), 
                            state VARCHAR(50),
                            city VARCHAR(50),
                            zipcode VARCHAR(10), 
                            webpage VARCHAR(255), 
                            phone VARCHAR(20),
                            facebook_profile VARCHAR(255), 
                            instagram_profile VARCHAR(255), 
                            digital_voice REAL,
                            google_maps REAL,
                            apple_maps REAL,
                            social_clarity REAL,
                            website_authority REAL,
                            last_month_searches REAL,
                            pdf_sent INTEGER,
                            keywords TEXT)''')
    connection.commit()
    cur.execute('''
                    CREATE UNIQUE INDEX IF NOT EXISTS ix_users_email2 ON Users (email)
                ''')
    connection.commit()
    close_connection(cur, connection)

def get_User_table():
    cur, connection = init_connection()
    cur.execute('''PRAGMA table_info(Users) ''')
    results = cur.fetchall()
    connection.commit()
    close_connection(cur, connection)



def insert_User(first_name, last_name, mobile_phone, email, name, size, address, city, state, zipcode, webpage, phone, facebook_profile, instagram_profile, digital_voice, google_maps, apple_maps, social_clarity, website_authority, last_month_searches, pdf_sent, keyworkds):

    cur, connection = init_connection()
    query = f"""
                    INSERT OR REPLACE INTO Users (first_name, last_name, mobile_phone, email, name, size, address, city, state, zipcode, webpage, phone, facebook_profile, instagram_profile, digital_voice, google_maps, apple_maps, social_clarity, website_authority, last_month_searches, pdf_sent, keywords) VALUES
                        ("{first_name}", "{last_name}", "{mobile_phone}", "{email}", "{name}", "{size}", "{address}", "{city}", "{state}", "{zipcode}", "{webpage}", "{phone}", "{facebook_profile}", "{instagram_profile}", {digital_voice}, {google_maps}, {apple_maps}, {social_clarity}, {website_authority}, {last_month_searches}, {pdf_sent}, "{keyworkds}")
                """
    cur.execute(query)
    cur.execute(f"""
                        EXPLAIN QUERY PLAN 
                        SELECT
                            *
                        FROM
                            Users
                        WHERE
                        email = "{email}"

                """)
    try:
        results = cur.fetchall()[0][0]
        connection.commit()
        close_connection(cur, connection)
        return results
    except Exception as error:
        return None


def retrieve_User_complete_report(email):

    cur, connection = init_connection()
    query = f""" 
                    SELECT last_month_searches, digital_voice, google_maps, apple_maps, social_clarity, website_authority, state, city, zipcode, webpage, name, address, keywords  FROM Users WHERE email = '{email}'
                """
    cur.execute(query)
    try:
        results = cur.fetchall()[0]
        connection.commit()
        close_connection(cur, connection)
        return results
    except Exception as error:
        return None

