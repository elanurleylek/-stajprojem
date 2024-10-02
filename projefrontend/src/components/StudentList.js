import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStudents, deleteStudent } from '../services/api';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      setError('Öğrenciler alınamadı. Lütfen tekrar deneyin.');
      console.error("Öğrenciler alınırken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu öğrenciyi silmek istediğinizden emin misiniz?')) {
      try {
        await deleteStudent(id);
        fetchStudents();
      } catch (error) {
        setError('Öğrenci silinemedi. Lütfen tekrar deneyin.');
        console.error("Öğrenci silinirken hata oluştu:", error);
      }
    }
  };


  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div>
      <h2>Öğrenciler</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Link to="/students/new" className="add-student-button">Yeni Öğrenci Ekle</Link>
      <table>
        <thead>
          <tr>
            <th>Öğrenci Adı</th>
            <th>Bölümü</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.department?.name || 'Belirtilmemiş'}</td>
              <td>
                <button className="edit-button" to={`/students/edit/${student.id}`}>Düzenle</button>
                <button className="delete-button" onClick={() => handleDelete(student.id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;