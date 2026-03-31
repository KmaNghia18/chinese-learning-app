---
name: add-vocab
description: Add new vocabulary words to a lesson
argument-hint: [lesson_id] [hanzi] [pinyin] [meaning_vi]
---
Generate a SQL INSERT statement to add vocabulary to the chinese_learning database.

Format:
```sql
INSERT INTO vocabulary (lesson_id, hanzi, pinyin, meaning_vi, meaning_en, example_sentence_zh, example_sentence_vi, hsk_level, word_type)
VALUES (<lesson_id>, '<hanzi>', '<pinyin>', '<meaning_vi>', '<meaning_en>', '<example_zh>', '<example_vi>', 'HSK1', 'noun');
```

Then run it via the MySQL Docker container:
```bash
docker exec chinese_learning_db mysql -u appuser -papppass123 chinese_learning -e "<SQL>"
```
