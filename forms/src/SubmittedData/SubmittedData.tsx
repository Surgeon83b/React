import type {FormDataWithBase64} from "../types.ts";
import {type RootState, useAppSelector} from "../store";
import './SubmittedData.css';
import {useEffect, useState} from "react";

const SubmittedData = () => {
  const { formData, initialFormData } = useAppSelector((state: RootState) => state.form);
  const [highlightedFields, setHighlightedFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!formData || !initialFormData) return;

    // Находим измененные поля
    const modifiedFields = new Set<string>();
    Object.keys(formData).forEach(fieldName => {
      const currentValue = formData[fieldName as keyof FormDataWithBase64];
      const initialValue = initialFormData[fieldName as keyof FormDataWithBase64];

      if (JSON.stringify(currentValue) !== JSON.stringify(initialValue)) {
        modifiedFields.add(fieldName);
      }
    });

    // Устанавливаем подсветку
    setHighlightedFields(modifiedFields);

    // Убираем подсветку через 5 секунд
    const timer = setTimeout(() => {
      setHighlightedFields(new Set());
    }, 5000);

    return () => clearTimeout(timer);
  }, [formData, initialFormData]);

  if (!formData) return null;

  const isFieldModified = (fieldName: string): boolean => {
    return highlightedFields.has(fieldName);
  };

  return (
    <div className="profile-data">
      <h2>Form Submitted Successfully!</h2>
      <div className={`data-field ${isFieldModified('name') ? 'modified' : ''}`}>
        <label>Name:</label>
        <span>{formData.name}</span>
      </div>

      <div className={`data-field ${isFieldModified('email') ? 'modified' : ''}`}>
        <label>Email:</label>
        <span>{formData.email}</span>
      </div>

      <div className={`data-field ${isFieldModified('age') ? 'modified' : ''}`}>
        <label>Age:</label>
        <span>{formData.age}</span>
      </div>

      <div className={`data-field ${isFieldModified('country') ? 'modified' : ''}`}>
        <label>Country:</label>
        <span>{formData.country}</span>
      </div>

      <div className={`data-field ${isFieldModified('gender') ? 'modified' : ''}`}>
        <label>Gender:</label>
        <span>{formData.gender}</span>
      </div>
    </div>
  );
};

export default SubmittedData;