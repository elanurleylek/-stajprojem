import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createStudent, getStudentById, updateStudent } from '../services/api';
import { getDepartments } from '../services/api';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // Başarı mesajı durumu
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
    
    if (id) {
      setIsEditMode(true);
      fetchStudent(id);
    }
  }, [id]);

  const fetchDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (error) {
      console.error('Bölümler alınamadı:', error);
    }
  };

  const fetchStudent = async (id) => {
    try {
      const student = await getStudentById(id);
      setName(student.name);
      setDepartmentId(student.department.id);
    } catch (error) {
      console.error('Öğrenci alınamadı:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = { name, department: { id: departmentId } };

    try {
      if (isEditMode) {
        await updateStudent(id, studentData);
        setSuccessMessage('Öğrenci başarıyla güncellendi.'); // Başarı mesajı
      } else {
        await createStudent(studentData);
        setSuccessMessage('Öğrenci başarıyla eklendi.'); // Başarı mesajı
      }
      navigate('/'); // Başarılı bir şekilde gönderildiğinde yönlendirme
    } catch (error) {
      console.error('Öğrenci oluşturulamadı veya güncellenemedi:', error);
    }
  };

  return (
    <div>
      <h2>{isEditMode ? 'Öğrenciyi Güncelle' : 'Yeni Öğrenci Ekle'}</h2>
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>} {/* Başarı mesajını göster */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Öğrenci Adı:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="department">Bölüm:</label>
          <select
            id="department"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
            required
          >
            <option value="">Bölüm Seçin</option>
            {departments.map(department => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <button className='addStudent' type="submit">{isEditMode ? 'Ekle' : 'Ekle'}</button>
      </form>
    </div>
  );
};

export default StudentForm;
