import './App.css';
import { CanvasScrollAnimation } from './Components/AirPodsCanvas/CanvasScrollAnimation';

function App() {
  return (
    <div className='App'>
      <CanvasScrollAnimation frameCount={147} link={'https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/'}/>
    </div>
  );
}

export default App;
