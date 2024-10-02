import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDepartments, deleteDepartment } from '../services/api';

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (error) {
      setError("Bölümler alınamadı. Lütfen tekrar deneyin.");
      console.error("Bölümler alınırken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu bölümü silmek istediğinizden emin misiniz?')) {
      try {
        await deleteDepartment(id);
        fetchDepartments();
      } catch (error) {
        setError("Bölüm silinemedi. Lütfen tekrar deneyin.");
        console.error("Bölüm silinirken hata oluştu:", error);
      }
    }
  };

  const onEdit = (id) => {
    navigate(`/departments/edit/${id}`);
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div>
      <h2>Bölümler</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Link to="/departments/new">Yeni Bölüm Ekle</Link>
      <table>
        <thead>
          <tr>
            <th>Adı</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {departments.map(department => (
            <tr key={department.id}>
              <td>{department.name}</td>
              <td>
                <button className="edit-button" onClick={() => onEdit(department.id)}>
                  Düzenle
                </button>
                <button className="delete-button" onClick={() => handleDelete(department.id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentList;