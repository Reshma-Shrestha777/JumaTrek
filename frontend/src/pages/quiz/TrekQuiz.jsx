import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Result } from 'antd';
import { 
  ArrowLeftOutlined,
  CheckOutlined,
  EnvironmentOutlined,
  FireFilled,
  TeamOutlined as TeamIcon,
  StarFilled,
  FlagFilled,
  ThunderboltFilled
} from '@ant-design/icons';
import './TrekQuiz.css';

// Fallback icons
const MountainOutlined = EnvironmentOutlined;
const TreeOutlined = EnvironmentOutlined;

const { Title, Text } = Typography;

const questions = [
  {
    id: 1,
    question: 'What is your trekking experience level?',
    description: 'Help us recommend the perfect trek for your skill level',
    icon: <FireFilled />,
    options: [
      { 
        value: 'beginner', 
        label: 'Beginner',
        description: 'First time trekker',
        icon: '1'
      },
      { 
        value: 'intermediate', 
        label: 'Intermediate',
        description: 'Some trekking experience',
        icon: '2'
      },
      { 
        value: 'advanced', 
        label: 'Advanced',
        description: 'Regular trekker',
        icon: '3'
      },
      { 
        value: 'expert', 
        label: 'Expert',
        description: 'Challenging treks preferred',
        icon: '4'
      },
    ],
  },
  {
    id: 2,
    question: 'How many days can you dedicate to your trek?',
    description: 'This helps us find treks that fit your schedule',
    icon: <span>🗓️</span>,
    options: [
      { 
        value: '1-3', 
        label: '1-3 days',
        description: 'Short getaway',
        icon: '1-3'
      },
      { 
        value: '4-7', 
        label: '4-7 days',
        description: 'Week-long adventure',
        icon: '4-7'
      },
      { 
        value: '8-14', 
        label: '8-14 days',
        description: 'Extended journey',
        icon: '8-14'
      },
      { 
        value: '15+', 
        label: '15+ days',
        description: 'Epic expedition',
        icon: '15+'
      },
    ],
  },
  {
    id: 3,
    question: 'Do you prefer to travel in a group or solo?',
    description: 'We can match you with the right experience',
    icon: <TeamIcon />,
    options: [
      { 
        value: 'solo', 
        label: 'Solo',
        description: 'I prefer to explore on my own',
        icon: '👤'
      },
      { 
        value: 'small-group', 
        label: 'Small Group', 
        description: '2-4 people',
        icon: '👥'
      },
      { 
        value: 'medium-group', 
        label: 'Medium Group',
        description: '5-10 people',
        icon: '👥👥'
      },
      { 
        value: 'large-group',
        label: 'Large Group', 
        description: '10+ people',
        icon: '👥👥👥'
      }
    ],
  },
  {
    id: 4,
    question: 'What type of scenery excites you most?',
    description: 'Choose what inspires your journey',
    icon: <MountainOutlined />,
    options: [
      { 
        value: 'mountain', 
        label: 'Mountain Peaks',
        description: 'Snow-capped summits',
        icon: '🏔️'
      },
      { 
        value: 'valley', 
        label: 'Lush Valleys',
        description: 'Green landscapes',
        icon: '🌿'
      },
      { 
        value: 'village', 
        label: 'Village Life',
        description: 'Cultural immersion',
        icon: '🏘️'
      },
      { 
        value: 'wilderness', 
        label: 'Remote Wilderness',
        description: 'Off the beaten path',
        icon: '🌲'
      },
    ],
  },
  {
    id: 5,
    question: 'What is your main goal for this trek?',
    description: 'What drives your adventure?',
    icon: <FlagFilled />,
    options: [
      { 
        value: 'adventure', 
        label: 'Adventure',
        description: 'Challenge myself',
        icon: '⚡'
      },
      { 
        value: 'nature', 
        label: 'Nature',
        description: 'Connect with nature',
        icon: '🌳'
      },
      { 
        value: 'culture', 
        label: 'Culture',
        description: 'Local experiences',
        icon: '🎭'
      },
      { 
        value: 'wellness', 
        label: 'Wellness',
        description: 'Relax and recharge',
        icon: '🧘'
      },
    ],
  },
];

const recommendations = {
  beginner: {
    title: 'Beginner Treks',
    description: 'Based on your answers, we recommend these beginner-friendly treks:',
    treks: [
      { name: 'Ghorepani Poon Hill Trek', duration: '5-7 days', maxAltitude: '3,210m' },
      { name: 'Langtang Valley Trek', duration: '7-10 days', maxAltitude: '3,870m' },
      { name: 'Tamang Heritage Trail', duration: '7-9 days', maxAltitude: '3,165m' },
    ],
  },
  intermediate: {
    title: 'Moderate Treks',
    description: 'Based on your answers, we recommend these moderate treks:',
    treks: [
      { name: 'Annapurna Base Camp Trek', duration: '10-12 days', maxAltitude: '4,130m' },
      { name: 'Langtang Gosaikunda Trek', duration: '10-12 days', maxAltitude: '4,610m' },
      { name: 'Manaslu Circuit Trek', duration: '14-16 days', maxAltitude: '5,106m' },
    ],
  },
  advanced: {
    title: 'Challenging Treks',
    description: 'Based on your answers, we recommend these challenging treks:',
    treks: [
      'Everest Base Camp Trek',
      'Annapurna Circuit Trek',
      'Upper Mustang Trek',
      'Kanchenjunga Base Camp Trek',
    ],
  },
};

const TrekQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const navigate = useNavigate();
  
  const handleAnswer = (questionId, answer) => {
    const newAnswers = {
      ...answers,
      [questionId]: answer
    };
    setAnswers(newAnswers);
    
    // Auto-advance to next question after selection
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        calculateRecommendation(newAnswers);
      }
    }, 300);
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      navigate(-1);
    }
  };

  const calculateRecommendation = (answers) => {
    // Simple recommendation logic - can be enhanced
    const experience = answers[1] || 'beginner';
    const duration = answers[2];
    const groupSize = answers[3];
    const scenery = answers[4];
    const goal = answers[5];

    // This is a simplified recommendation logic
    if (experience === 'beginner') return showResults('beginner');
    if (experience === 'expert') return showResults('expert');
    return showResults('intermediate');
  };

  const showResults = (level) => {
    setRecommendation(recommendations[level]);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setRecommendation(null);
  };

  if (showResult && recommendation) {
    return (
      <div className="kimkim-result-container">
        <div className="kimkim-result-content">
          <h1>{recommendation.title}</h1>
          <p className="result-description">{recommendation.description}</p>
          
          <div className="result-actions">
            <Button 
              type="primary" 
              size="large"
              className="primary-button"
              onClick={() => navigate('/all-treks')}
            >
              Explore Recommended Treks
            </Button>
            <Button 
              type="text" 
              className="text-button"
              onClick={resetQuiz}
            >
              Retake the Quiz
            </Button>
          </div>

          <div className="recommended-treks">
            <h2>Top Picks For You</h2>
            <div className="trek-grid">
              {recommendation.treks && recommendation.treks.map((trek, index) => (
                <div key={index} className="trek-card">
                  <div 
                    className="trek-image" 
                    style={{ backgroundImage: `url(${trek.image})` }}
                  >
                    <div className="trek-difficulty">{trek.difficulty}</div>
                  </div>
                  <div className="trek-details">
                    <h3>{trek.name}</h3>
                    <p className="trek-duration">{trek.duration}</p>
                    <p className="trek-highlights">{trek.highlights}</p>
                    <div className="trek-footer">
                      <span className="trek-price">From ${trek.price}</span>
                      <Button 
                        type="primary" 
                        size="small"
                        onClick={() => navigate(`/trek/${trek.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];
  const progress = ((currentQuestion) / (questions.length - 1)) * 100;
  
  return (
    <div className="kimkim-quiz-container">
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="kimkim-quiz-content">
        <div className="question-header">
          <h1>{currentQuestionData.question}</h1>
          {currentQuestionData.description && (
            <p className="question-subtitle">{currentQuestionData.description}</p>
          )}
        </div>
        
        <div className="options-grid">
          {currentQuestionData.options.map((option, index) => (
            <div 
              key={index}
              className={`option-card ${answers[currentQuestionData.id] === option.value ? 'selected' : ''}`}
              onClick={() => handleAnswer(currentQuestionData.id, option.value)}
            >
              <div className="option-icon">{option.icon}</div>
              <div className="option-content">
                <h3>{option.label}</h3>
                {option.description && <p>{option.description}</p>}
              </div>
              <div className="checkmark">
                <CheckOutlined />
              </div>
            </div>
          ))}
        </div>
        
        <div className="navigation-buttons">
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />}
            onClick={prevQuestion}
            className="back-button"
          >
            {currentQuestion === 0 ? 'Back to Home' : 'Back'}
          </Button>
          
          <div className="step-indicator">
            {currentQuestion + 1} of {questions.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrekQuiz;
