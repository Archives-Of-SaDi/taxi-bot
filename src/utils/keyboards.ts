import { Keyboard, InlineKeyboard } from '../core/deps.ts';

export const customerOrChauffeur = new Keyboard()
  .text("Yo'lovchi")
  .text('Haydovchi')
  .resized(true)
  .oneTime(true);

export const regions = new Keyboard()
  .text('Andijon')
  .text('Buxoro')
  .text('Jizzax')
  .text('Qashqadaryo')
  .row()
  .text('Navoiy')
  .text('Namangan')
  .text('Samarqand')
  .text('Sirdaryo')
  .row()
  .text('Surxondaryo')
  .text('Toshkent')
  .text("Farg'ona")
  .text('Xorazm')
  .row()
  .resized(true)
  .oneTime(true);

export const genderKeyboard = new Keyboard()
  .text('Erkak')
  .text('Ayol')
  .row()
  .resized(true)
  .oneTime(true);

export const formCorrect = new InlineKeyboard()
  .text("To'g'ri", 'true')
  .text('Xato', 'false');

export const countOfSpaces = new Keyboard()
  .text('1')
  .text('2')
  .text('3')
  .row()
  .text('4')
  .text('5')
  .text('6')
  .row()
  .text('7')
  .text('8')
  .text('9')
  .row()
  .text('10')
  .row()
  .oneTime(true)
  .resized(true);
