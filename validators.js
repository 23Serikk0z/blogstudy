import { body } from 'express-validator';


export const registerValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5, max: 32}),
    body('fullName', 'Укажите полное имя').isLength({min: 3}),
    body('avatarUrl', 'Неверная ссылка').optional().isURL()
]

export const loginValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5, max: 32})
]

export const postCreateValidator = [
    body('title', 'Введите заголовок статьи ').isLength({min: 5, max: 50}).isString(),
    body('text', 'Введите текст статьи').isLength({min: 5}).isString(),
    body('tags', 'Неверный формат тэгов').optional().isString(),
    body('imageUrl', 'Неверная ссылка').optional().isString()
]