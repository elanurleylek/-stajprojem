export const getStudents = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/students');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch students:', error);
      throw error; // Hatanın üst katmana ulaşması için yeniden fırlat
    }
  };
  
  
  export const deleteStudent = async (id) => {
    const response = await fetch(`http://localhost:8080/api/students/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Öğrenci silinemedi.');
  };
  
  export const createStudent = async (studentData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/students`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
  
      if (!response.ok) {
        throw new Error('HTTP error! status: ' + response.status);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Öğrenci eklenemedi:', error);
      throw error;
    }
  };
  
  
  
  export const updateStudent = async (id, student) => {
    const response = await fetch(`http://localhost:8080/api/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
    if (!response.ok) throw new Error('Öğrenci güncellenemedi.');
  };
  export const getDepartments = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/departments');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch departments:', error);
      throw error;
    }
  };
  
  
  export const getStudentById = async (id) => {
    const response = await fetch(`http://localhost:8080/api/students/${id}`);
    if (!response.ok) throw new Error('Öğrenci bulunamadı.');
    return response.json();
  };

  export const getDepartment = async (id) => {
    const response = await fetch(`/api/departments/${id}`);
    if (!response.ok) throw new Error('Bölüm bulunamadı.');
    return response.json();
  };
  
  export const createDepartment = async (department) => {
    const response = await fetch('http://localhost:8080/api/departments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(department),
    });
    if (!response.ok) throw new Error('Bölüm oluşturulamadı.');
    return response.json();
  };
  
  export const updateDepartment = async (id, department) => {
    const response = await fetch(`http://localhost:8080/api/departments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(department),
    });
    if (!response.ok) throw new Error('Bölüm güncellenemedi.');
  };
  
  export const deleteDepartment = async (id) => {
    const response = await fetch(`http://localhost:8080/api/departments/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Bölüm silinemedi.');
  };
  