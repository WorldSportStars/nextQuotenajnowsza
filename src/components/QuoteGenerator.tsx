import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

interface QuoteGeneratorProps {
  category: string;
  onQuoteGenerated: (quote: string) => void;
}

const QuoteGenerator: React.FC<QuoteGeneratorProps> = ({ category, onQuoteGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [usedQuotes, setUsedQuotes] = useState<string[]>([]);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      let response;
      if (category === 'LEGENDARY') {
        response = await axios.get('https://api.quotable.io/random');
        const quote = `${response.data.content} — ${response.data.author}`;

        if (!usedQuotes.includes(quote)) {
          onQuoteGenerated(quote);
          setUsedQuotes([...usedQuotes, quote]);
        } else {
          fetchQuote();
        }
      } else {
        response = await axios.get('https://api.quotable.io/random');
        const quote = response.data.content;

        if (!usedQuotes.includes(quote)) {
          onQuoteGenerated(quote);
          setUsedQuotes([...usedQuotes, quote]);
        } else {
          fetchQuote();
        }
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={fetchQuote}
      disabled={loading}
      style={{ margin: '10px 0' }}
    >
      {loading ? 'Loading...' : 'Generate Quote'}
    </Button>
  );
};

export default QuoteGenerator;
