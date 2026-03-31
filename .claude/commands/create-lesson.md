---
name: create-lesson
description: Create a new lesson with vocabulary for a given HSK topic
argument-hint: [topic] [hsk_level]
---
Create a new lesson in the database:
1. INSERT into `lessons` table with title (Vietnamese), title_zh (Chinese), hsk_level, order_index
2. INSERT 5-10 vocabulary words into `vocabulary` table for that lesson
3. Include hanzi, pinyin, meaning_vi, example_sentence_zh, example_sentence_vi
4. Run via Docker: `docker exec chinese_learning_db mysql -u appuser -papppass123 chinese_learning`
