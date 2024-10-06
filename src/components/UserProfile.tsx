import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import styled from 'styled-components';
import { Article } from '../app/slices/newsSlice';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const PinnedContainer = styled.div`
  margin-bottom: 20px;
`;

const RemovedContainer = styled.div`
  margin-bottom: 20px;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap; 
  justify-content: flex-start;
  gap: 15px;
`;

const StyledCard = styled(Card)`
  flex: 0 1 calc(50% - 20px);
  margin-bottom: 20px;
  opacity: 0.6;
  pointer-events: none;  
  background-color: #f0f0f0; 
  border: 1px solid #ccc;

  h4 {
    color: #888;  
  }

  p {
    color: #666;  
  }
`;

const UserProfile: React.FC = () => {
  const [pinnedArticles, setPinnedArticles] = useState<Article[]>([]);
  const [removedArticles, setRemovedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const storedPinnedArticles = localStorage.getItem('pinnedArticles');
    const storedRemovedArticles = localStorage.getItem('removedArticles');

    if (storedPinnedArticles) {
      setPinnedArticles(JSON.parse(storedPinnedArticles));
    }

    if (storedRemovedArticles) {
      setRemovedArticles(JSON.parse(storedRemovedArticles));
    }
  }, []);

  return (
    <Container>
      <PinnedContainer>
        <h3>Pinned Articles</h3>
        {pinnedArticles.length === 0 ? (
          <p>No pinned articles</p>
        ) : (
          <CardGrid>
            {pinnedArticles.map((article) => (
              <StyledCard key={article.url} title={article.title} subTitle={article.source.name}>
                {article.urlToImage && <img src={article.urlToImage} alt={article.title} style={{ width: '100%', borderRadius: '8px' }} />}
                <p>{article.description}</p>
              </StyledCard>
            ))}
          </CardGrid>
        )}
      </PinnedContainer>

      <RemovedContainer>
        <h3>Removed Articles</h3>
        {removedArticles.length === 0 ? (
          <p>No removed articles</p>
        ) : (
          <CardGrid>
            {removedArticles.map((article) => (
              <StyledCard key={article.url} title={article.title} subTitle={article.source.name}>
                {article.urlToImage && <img src={article.urlToImage} alt={article.title} style={{ width: '100%', borderRadius: '8px' }} />}
                <p>{article.description}</p>
              </StyledCard>
            ))}
          </CardGrid>
        )}
      </RemovedContainer>
    </Container>
  );
};

export default UserProfile;
