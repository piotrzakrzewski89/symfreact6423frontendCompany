import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/useAuth';
import CompanyTable from '../components/CompanyTable';
import CompanyCreateModal from '../components/CompanyCreateModal';
import { getCompany, createCompany } from '../api/company';

const Home = () => {
  const { admin } = useAuth();
  const [companies, setCompany] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchCompany = async () => {
    setLoading(true);
    try {
      const data = await getCompany();
      setCompany(data);
    } catch (err) {
      console.error('Błąd ładowania firm ', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  const handleCreateCompany = async (CompanyData) => {
    try {
      await createCompany(CompanyData);
      await fetchCompany(); // odśwież listę po dodaniu
      setModalOpen(false); // zamknij modal po sukcesie
    } catch (err) {
      console.error('Błąd przy tworzeniu użytkownika:', err.response?.data || err.message);
    }
  };

  return (
    <div className="mt-5 text-center">
      <p>
        Witaj <strong>{admin?.email}</strong>
      </p>
      <p>Twoje role: {admin?.roles?.join(', ')}</p>

      <CompanyTable companies={companies} loading={loading} onCreateClick={() => setModalOpen(true)} />

      <CompanyCreateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateCompany}
      />
    </div>
  );
};

export default Home;
