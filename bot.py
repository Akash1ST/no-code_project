import telebot
import random

TOKEN = "8583088787:AAHYnyVecgD-C75YUIBEy7Ld6xSmjxTPR7Y"
bot = telebot.TeleBot(TOKEN)

@bot.message_handler(commands=['start'])
def start(message):
    bot.send_message(message.chat.id, "Добро пожаловать! Используйте /help для списка команд")

@bot.message_handler(commands=['help'])
def help(message):
    commands = """
    📋 Доступные команды:
    /start - Начать
    /help - Помощь
    /random - Случайное число
    /cat - Случайный факт о котах
    /roll - Бросить кубик
    """
    bot.send_message(message.chat.id, commands)

@bot.message_handler(commands=['random'])
def random_number(message):
    num = random.randint(1, 100)
    bot.send_message(message.chat.id, f"🎲 Ваше случайное число: {num}")

@bot.message_handler(commands=['cat'])
def cat_fact(message):
    facts = [
        "Кошки спят 70% своей жизни",
        "У кошек 32 мышцы в каждом ухе",
        "Кошки могут поворачивать уши на 180 градусов"
    ]
    bot.send_message(message.chat.id, random.choice(facts))

@bot.message_handler(commands=['roll'])
def dice(message):
    dice = random.randint(1, 6)
    bot.send_message(message.chat.id, f"🎯 Выпало: {dice}")

@bot.message_handler(func=lambda m: "привет" in m.text.lower())
def hello(message):
    bot.reply_to(message, "И тебе привет! 😊")

print("✅ Бот запущен и работает...")
bot.polling(none_stop=True)