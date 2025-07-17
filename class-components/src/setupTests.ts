import '@testing-library/jest-dom'; // Добавляет toBeInTheDocument()
import { jest } from '@jest/globals'; // Фикс для "jest is not defined"

// Если нужно, добавьте другие глобальные моки
global.jest = jest;