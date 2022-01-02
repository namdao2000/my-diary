export const SQL_STATEMENTS = {
  initialiseDatabase: `
      CREATE TABLE IF NOT EXISTS user
      (
          username   VARCHAR(255) PRIMARY KEY,
          password   VARCHAR(255) NOT NULL,
          first_name VARCHAR(255) NOT NULL,
          last_name  VARCHAR(255) NOT NULL,
          ip_address VARCHAR(255),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
      );

      CREATE TABLE IF NOT EXISTS diary_page
      (
          page_id    UUID PRIMARY KEY,
          username   VARCHAR(255) NOT NULL,
          title      VARCHAR(255) NOT NULL,
          content    TEXT,
          view_count INTEGER  DEFAULT 0 NOT NULL,
          is_public  BOOLEAN  DEFAULT FALSE NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
          FOREIGN KEY (username) REFERENCES user (username)
      );

      CREATE TRIGGER IF NOT EXISTS diary_page_auto_updated_at
          AFTER UPDATE
          ON diary_page
          WHEN NEW.view_count = OLD.view_count
      BEGIN
          UPDATE diary_page SET updated_at = CURRENT_TIMESTAMP WHERE page_id = NEW.page_id;
      END;

      CREATE TRIGGER IF NOT EXISTS user_auto_updated_at
          AFTER UPDATE
          ON user
      BEGIN
          UPDATE user SET updated_at = CURRENT_TIMESTAMP WHERE username = NEW.username;
      END;
  `,
  createUser: `
      INSERT INTO user (username, password, first_name, last_name, ip_address)
      VALUES (?, ?, ?, ?, ?)
  `,
  getUserPassword: `
      SELECT password
      FROM user
      WHERE username = ?
  `,
  getUser: `
      SELECT *
      FROM user
      WHERE username = ?
  `,
  createDiaryPage: `
      INSERT INTO diary_page (page_id, username, title, content)
      VALUES (?, ?, ?, ?);
  `,
  updateDiaryPage: `
      UPDATE diary_page
      SET title     = ?,
          content   = ?,
          is_public = ?
      WHERE page_id = ?;
  `,
  getDiaryPageUsername: `
      SELECT username
      FROM diary_page
      WHERE page_id = ?
  `,
  deleteDiaryPage: `
      DELETE
      FROM diary_page
      WHERE page_id = ?;
  `,
  getOneDiaryPage: `
      SELECT page_id,
             username,
             title,
             content,
             view_count,
             is_public,
             datetime(created_at, 'localtime') as created_at,
             datetime(updated_at, 'localtime') as updated_at
      FROM diary_page
      WHERE page_id = ?;
  `,
  getOnePublicDiaryPage: `
        SELECT page_id,
             username,
             title,
             content,
             view_count,
             is_public,
             datetime(created_at, 'localtime') as created_at,
             datetime(updated_at, 'localtime') as updated_at
      FROM diary_page
      WHERE page_id = ? AND is_public;
  `,
  getDiaryPages: `
      SELECT page_id,
             username,
             title,
             content,
             view_count,
             is_public,
             datetime(created_at, 'localtime') as created_at,
             datetime(updated_at, 'localtime') as updated_at
      FROM diary_page
      WHERE username = ?
      ORDER BY updated_at DESC
      LIMIT ? OFFSET ?
  `,
  getDiaryPagesCount: `
      SELECT COUNT(*) as count
      FROM diary_page
      WHERE username = ?;
  `,
  getPublicDiaryPagesCount: `
      SELECT COUNT(*) as count
      FROM diary_page
      WHERE is_public;
  `,
  getPublicDiaryPages: `
      SELECT page_id,
             username,
             title,
             content,
             view_count,
             is_public,
             datetime(created_at, 'localtime') as created_at,
             datetime(updated_at, 'localtime') as updated_at
      FROM diary_page
      WHERE is_public = TRUE
      ORDER BY view_count DESC, created_at DESC
      LIMIT ? OFFSET ?
  `,
  incrementDiaryPageViewCount: `
      UPDATE diary_page
      SET view_count = view_count + 1
      WHERE page_id = ?`,
};
