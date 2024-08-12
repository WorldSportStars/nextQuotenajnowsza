'use client';
import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Footer from 'src/components/Footer';
import TransactionWrapper from 'src/components/TransactionWrapper';
import WalletWrapper from 'src/components/WalletWrapper';
import { useAccount } from 'wagmi';
import LoginButton from '../components/LoginButton';
import SignupButton from '../components/SignupButton';
import BaseSvg from 'src/svg/BaseSvg'; 
import { ChromePicker } from 'react-color'; 

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background: url('/images/2704055.jpg') no-repeat center center fixed;
  background-size: cover;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  max-width: 1400px;
  margin-bottom: 20px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  gap: 40px;
  background-color: rgba(255, 255, 255, 0.9); 
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  width: 320px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    max-width: 450px;
  }
`;

const PointsContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
`;

const ColorPickerPanel = styled(ControlPanel)`
  align-items: center;
`;

const QuoteContainer = styled.div<{ bgColor: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.bgColor || '#030712'};
  border-radius: 10px;
  width: 512px;
  height: 512px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    max-width: 450px;
    height: auto;
  }
`;

const QuoteText = styled.p<{ fontFamily: string; effect: string; fontColor: string }>`
  font-size: 1.5rem; 
  color: ${(props) => props.fontColor || '#ffffff'};
  text-align: center;
  font-family: ${(props) => props.fontFamily};
  font-weight: ${(props) => (props.effect === 'bold' ? 'bold' : 'normal')};
  font-style: ${(props) => (props.effect === 'italic' ? 'italic' : 'normal')};
  text-decoration: ${(props) => (props.effect === 'underline' ? 'underline' : 'none')};
  overflow-wrap: break-word;
  max-width: 100%;
  max-height: 100%;
  word-wrap: break-word;
  line-height: 1.5; 
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const CollectButtonContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 450px;
  }
`;


export default function Page() {
  const { address } = useAccount();
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('AI');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [effect, setEffect] = useState('none');
  const [bgColor, setBgColor] = useState('#030712');
  const [fontColor, setFontColor] = useState('#ffffff');
  const [points, setPoints] = useState(0); // Nowy stan do przechowywania punktów

  const handleRandomQuote = async () => {
    const endpoint = category === 'AI' ? '' : 'famous-quotes';
    try {
      const response = await axios.get(`https://api.quotable.io/random${endpoint ? `?tags=${endpoint}` : ''}`);
      setQuote(response.data.content);
      setAuthor(category === 'LEGENDARY' ? response.data.author : '');
      // Dodaj punkty w zależności od kategorii
      const newPoints = category === 'AI' ? 25 : 100;
      setPoints(points + newPoints);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const handleRandomEverything = async () => {
    const categories = ['AI', 'LEGENDARY'];
    const fonts = ['Arial', 'Courier Prime', 'Georgia', 'Times New Roman', 'Verdana', 'Roboto', 'Lobster', 'Montserrat', 'Pacifico', 'Playfair Display', 'Raleway', 'Inconsolata'];
    const effects = ['none', 'bold', 'italic', 'underline'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    const randomBgColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const randomFontColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    setCategory(randomCategory);
    setFontFamily(randomFont);
    setEffect(randomEffect);
    setBgColor(randomBgColor);
    setFontColor(randomFontColor);

    const endpoint = randomCategory === 'AI' ? '' : 'famous-quotes';
    try {
      const response = await axios.get(`https://api.quotable.io/random${endpoint ? `?tags=${endpoint}` : ''}`);
      setQuote(response.data.content);
      setAuthor(randomCategory === 'LEGENDARY' ? response.data.author : '');
      // Dodaj punkty w zależności od kategorii
      const newPoints = randomCategory === 'AI' ? 25 : 100;
      setPoints(points + newPoints);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  return (
    <AppContainer>
      <Header>
        <div className="flex items-center gap-3">
          <BaseSvg width={64} height={64} /> 
          <a
            href="#"
            title="DailyQuotes On Base"
            target="_blank"
            rel="noreferrer"
          >
            <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold', fontFamily: 'Oswald' }}>DailyQuotes On Base</h1>
          </a>
        </div>
        <div className="flex items-center gap-3">
          <SignupButton />
          {!address && <LoginButton />}
        </div>
      </Header>

      <MainContent>
        <ControlPanel>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded px-4 py-2 mb-4"
          >
            <option value="AI">AI (All)</option>
            <option value="LEGENDARY">LEGENDARY (Famous)</option>
          </select>

          <label>Font</label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="border rounded px-4 py-2 mb-4"
          >
            <option value="Arial" style={{ fontFamily: 'Arial' }}>Arial</option>
            <option value="Courier Prime" style={{ fontFamily: 'Courier Prime' }}>Courier Prime</option>
            <option value="Georgia" style={{ fontFamily: 'Georgia' }}>Georgia</option>
            <option value="Times New Roman" style={{ fontFamily: 'Times New Roman' }}>Times New Roman</option>
            <option value="Verdana" style={{ fontFamily: 'Verdana' }}>Verdana</option>
            <option value="Roboto" style={{ fontFamily: 'Roboto' }}>Roboto</option>
            <option value="Lobster" style={{ fontFamily: 'Lobster' }}>Lobster</option>
            <option value="Montserrat" style={{ fontFamily: 'Montserrat' }}>Montserrat</option>
            <option value="Pacifico" style={{ fontFamily: 'Pacifico' }}>Pacifico</option>
            <option value="Playfair Display" style={{ fontFamily: 'Playfair Display' }}>Playfair Display</option>
            <option value="Raleway" style={{ fontFamily: 'Raleway' }}>Raleway</option>
            <option value="Inconsolata" style={{ fontFamily: 'Inconsolata' }}>Inconsolata</option>
          </select>

          <label>Effect</label>
          <select
            value={effect}
            onChange={(e) => setEffect(e.target.value)}
            className="border rounded px-4 py-2 mb-4"
          >
            <option value="none">None</option>
            <option value="bold">Bold</option>
            <option value="italic">Italic</option>
            <option value="underline">Underline</option>
          </select>

          <button onClick={handleRandomQuote} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
            Generate Quote
          </button>

          <button onClick={handleRandomEverything} className="bg-green-500 text-white px-4 py-2 rounded">
            Random Quote
          </button>

          <PointsContainer>
            Points: {points}
          </PointsContainer>
        </ControlPanel>

        <ColorPickerPanel>
          <h3>Custom Background Color</h3>
          <ChromePicker color={bgColor} onChange={(color: any) => setBgColor(color.hex)} />

          <h3 style={{ marginTop: '20px' }}>Custom Font Color</h3>
          <ChromePicker color={fontColor} onChange={(color: any) => setFontColor(color.hex)} />
        </ColorPickerPanel>

        <div>
          <QuoteContainer bgColor={bgColor}>
            <div className="flex h-full w-full items-center justify-center rounded-xl">
              <div className="rounded-xl px-4 py-[11px]">
                <QuoteText fontFamily={fontFamily} effect={effect} fontColor={fontColor}>
                  {quote ? `${quote}${author ? ` — ${author}` : ''}` : 'Welcome to DailyQuotes On Base! Generate your quote now!'}
                </QuoteText>
              </div>
            </div>
          </QuoteContainer>

          <CollectButtonContainer>
            {address ? (
              <TransactionWrapper address={address} />
            ) : (
              <WalletWrapper
                className="w-[450px] max-w-full"
                text="Sign in to collect"
              />
            )}
          </CollectButtonContainer>
        </div>
      </MainContent>

      <Footer />
    </AppContainer>
  );
}
