export const SQL_STATEMENTS = {
  /**
   *   Limitation of SQLite is that we cannot use PIVOT to turn rows into columns. Hence, I've hard coded
   *   the column values here, and used max() to filter out the 'null' values using GROUP BY.
   *
   *   I've also assumed that unless the person has completed the survey, we will not count it as the most recent result.
   *   Therefore, I have used the most recent 'completed_at' instead of most recent 'updated_at' records.
   */
  initialiseDatabase: `
CREATE TABLE IF NOT EXISTS user (
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    ip_address VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME
   );

CREATE TABLE IF NOT EXISTS diary_document (
    document_id UUID PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME,
    FOREIGN KEY (username) REFERENCES user (username)
    );
`,
  createNewUser: `
  INSERT INTO user (username, password, first_name, last_name, ip_address)
  VALUES (?, ?, ?, ?, ?)
  `,

  getUserPassword: `
  SELECT password from user where username = ? 
  `,
  getUser: `
  SELECT * from user where username = ?
  `,
};
