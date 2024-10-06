import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadNews } from '../app/slices/newsSlice';
import { RootState, AppDispatch } from '../app/store';
import NewsList from '../components/NewsList';
import { ProgressSpinner } from 'primereact/progressspinner';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const InfoMessage = styled.div`
  background-color: #f9f9e6; 
  color: #555;
  font-size: 1.2rem;
  text-align: center;
  padding: 15px;
  margin: 0;
  border: 1px solid #e0e0e0; 
  border-radius: 5px; 
  width: 100%;
`;

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error } = useSelector((state: RootState) => state.news);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(loadNews());
  }, [dispatch]);

  if (loading) {
    return (
      <SpinnerContainer>
        <ProgressSpinner color='#248428' />
      </SpinnerContainer>
    );
  }

  return (
    <div>
      { !isAuthenticated && (
        <InfoMessage>
          Login to access your news history in <strong>Profile</strong>.
        </InfoMessage>
      )}
      <h1 style={{ textAlign: 'center' }}>Latest News</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="grid">
        <NewsList articles={articles} />
      </div>
    </div>
  );
};

export default Dashboard;
