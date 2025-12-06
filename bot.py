import logging
from aiogram import Bot, Dispatcher, types
from aiogram.types import WebAppInfo
from aiogram.dispatcher.filters import Command
from aiogram.utils import executor

# Настройки
API_TOKEN = "8583088787:AAHYnyVecgD-C75YUIBEy7Ld6xSmjxTPR7Y"
WEB_APP_URL = "https://akash1st.github.io/no-code_project"

# Инициализация
bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot)
logging.basicConfig(level=logging.INFO)

# Команда /start с кнопкой Web App
@dp.message_handler(Command('start'))
async def cmd_start(message: types.Message):
    # Создаем клавиатуру с Web App кнопкой
    keyboard = types.ReplyKeyboardMarkup(resize_keyboard=True)
    web_app = WebAppInfo(url=WEB_APP_URL)
    keyboard.add(types.KeyboardButton(
        text="Открыть приложение 🚀",
        web_app=web_app
    ))
    
    await message.answer(
        "👋 Добро пожаловать!\n\n"
        "Нажмите кнопку ниже, чтобы открыть мини-приложение:",
        reply_markup=keyboard
    )

# Обработка данных из Web App
@dp.message_handler(content_types=['web_app_data'])
async def handle_web_app_data(message: types.Message):
    data = message.web_app_data.data
    # data содержит JSON строку из tg.sendData()
    
    await message.answer(f"📱 Получены данные из Web App:\n{data}")
    
    # Можно парсить JSON и обрабатывать
    import json
    try:
        data_dict = json.loads(data)
        await message.answer(f"Действие: {data_dict.get('action')}")
    except:
        pass

# Инлайн режим с Web App
@dp.inline_handler()
async def inline_web_app(query: types.InlineQuery):
    web_app = WebAppInfo(url=WEB_APP_URL)
    
    result = types.InlineQueryResultArticle(
        id='1',
        title='Открыть приложение',
        input_message_content=types.InputTextMessageContent(
            message_text='Нажмите кнопку ниже, чтобы открыть приложение 👇'
        ),
        reply_markup=types.InlineKeyboardMarkup().add(
            types.InlineKeyboardButton(
                text="Запустить приложение",
                web_app=web_app
            )
        )
    )
    
    await query.answer([result], cache_time=1)

if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True)
