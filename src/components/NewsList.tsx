import { useState, useRef, useEffect } from 'react';
import { Card } from 'primereact/card';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Article } from '../app/slices/newsSlice';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto; 
  padding: 20px; 
  display: flex;
  gap: 15px;

  .p-ai-center {
    button:not(:first-child) {
      margin-left: 10px;
    }
  }

  > div {
    flex: 1 1 50%; 
  }
  
  @media (max-width: 768px) {
    width: 100%; 
    padding: 20px; 
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px; 
  flex: 1;
`;

const PinnedContainer = styled.div`
  position: sticky;
  top: 20px; 
  max-height: calc(100vh - 40px); 
  overflow-y: auto; 
  padding: 0 10px; 
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

interface NewsListProps {
  articles: Article[];
}

export default function NewsList({ articles }: NewsListProps) {
  const [currentArticles, setCurrentArticles] = useState<Article[]>(articles);
  const [pinnedArticles, setPinnedArticles] = useState<Article[]>(() => {
    const savedPinned = localStorage.getItem('pinnedArticles');
    return savedPinned ? JSON.parse(savedPinned) : [];
  });
  const [removedArticles, setRemovedArticles] = useState<Article[]>(() => {
    const savedRemoved = localStorage.getItem('removedArticles');
    return savedRemoved ? JSON.parse(savedRemoved) : [];
  });
  const toastRef = useRef<Toast>(null);

  useEffect(() => {
    localStorage.setItem('pinnedArticles', JSON.stringify(pinnedArticles));
    localStorage.setItem('removedArticles', JSON.stringify(removedArticles));
  }, [pinnedArticles, removedArticles]);

  useEffect(() => {
    if (removedArticles.length > 0 ) {
      const removedUrls = removedArticles.map(article => article.url);

      setCurrentArticles(articles.filter(article => !removedUrls.includes(article.url)));
    }
  }, [articles, removedArticles]);

  const handlePin = (article: Article) => {
    const isPinned = pinnedArticles.some(a => a.url === article.url);
    const updatedPinned = isPinned
      ? pinnedArticles.filter(a => a.url !== article.url)
      : [...pinnedArticles, { ...article, isPinned: true }];
    
    setPinnedArticles(updatedPinned);
  
    if (!isPinned) {
      toastRef.current?.show({ severity: 'info', summary: 'Pinned', detail: `${article.title} pinned`, life: 3000 });
    }
  };

  const handleRemove = (article: Article, options?: { isPinned?: boolean }) => {
    if (options?.isPinned) {
      setPinnedArticles(prev => prev.filter(a => a.url !== article.url));
    } else {
      setRemovedArticles(prev => [...prev, article]);
      setCurrentArticles(prev => prev.filter(a => a.url !== article.url));
    }

    toastRef.current?.show({ severity: 'warn', summary: 'Removed', detail: `${article.title} removed`, life: 3000 });
  };

  return (
    <Container>
      <Toast ref={toastRef} />
      <PinnedContainer>
        <h3>Pinned News</h3>
        {pinnedArticles.length === 0 ? (
          <p>No pinned articles</p>
        ) : (
          pinnedArticles.map(article => (
            <div key={article.url}>
              <Card title={article.title} subTitle={article.source.name}>
                {article.urlToImage && <img src={article.urlToImage} alt={article.title} style={{ width: '100%', borderRadius: '8px' }} />}
                <p>{article.description}</p>
                <Button label="Read more" icon="pi pi-book" className="p-button-text" onClick={() => window.open(article.url, '_blank')} />
                <Button label="Remove" icon="pi pi-times" className="p-button-outlined p-button-danger p-ml-2" onClick={() => handleRemove(article, { isPinned: true })} />
              </Card>
            </div>
          ))
        )}
      </PinnedContainer>
      <Column>
        {currentArticles.map(article => (
          <div key={article.url} className="col-12 mb-4">
            <Card title={article.title} subTitle={article.source.name} style={{ marginBottom: '10px' }} footer={
              <div className="p-d-flex p-ai-center">
                <Button label="Read more" icon="pi pi-book" className="p-button-text" onClick={() => window.open(article.url, '_blank')} />
                <Button label="Pin" icon={`pi pi-${pinnedArticles.some(a => a.url === article.url) ? 'minus' : 'plus'}-circle`} className={`p-button${pinnedArticles.some(a => a.url === article.url) ? '' : '-outlined'} p-button-secondary`} onClick={() => handlePin(article)} />
                <Button label="Remove" icon="pi pi-times" className="p-button-outlined p-button-danger" onClick={() => handleRemove(article)} />
              </div>
            }>
              {article.urlToImage && <img src={article.urlToImage} alt={article.title} style={{ width: '100%', borderRadius: '8px' }} />}
              <p>{article.description}</p>
            </Card>
          </div>
        ))}
      </Column>
    </Container>
  );
}