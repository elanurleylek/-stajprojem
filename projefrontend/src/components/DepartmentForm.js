import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createDepartment, getDepartment, updateDepartment } from '../services/api';

const DepartmentForm = () => {
  const [name, setName] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchDepartment(id);
    }
  }, [id]);

  const fetchDepartment = async (id) => {
    try {
      const department = await getDepartment(id);
      setName(department.name);
    } catch (error) {
      setError('Bölüm alınamadı. Lütfen tekrar deneyin.');
      console.error('Bölüm alınamadı:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const departmentData = { name };

    try {
      if (isEditMode) {
        await updateDepartment(id, departmentData);
      } else {
        await createDepartment(departmentData);
      }
      navigate('/departments');
    } catch (error) {
      setError('Bölüm oluşturulamadı veya güncellenemedi. Lütfen tekrar deneyin.');
      console.error('Bölüm oluşturulamadı veya güncellenemedi:', error);
    }
  };

  return (
    <div>
      <h2>{isEditMode ? 'Bölümü Güncelle' : 'Yeni Bölüm Ekle'}</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Bölüm Adı:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button className="add-button" type="submit">
          {isEditMode ? 'Güncelle' : 'Ekle'}
        </button>
      </form>
    </div>
  );
};

export default DepartmentForm;