import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Progress, Typography, Radio, Space, Result } from 'antd';
import { 
  ArrowLeftOutlined, 
  CheckCircleFilled, 
  StarFilled, 
  CalendarOutlined, 
  EnvironmentOutlined, 
  FireFilled,
  HomeOutlined,
  FlagFilled,
  ThunderboltFilled,
  CheckOutlined
} from '@ant-design/icons';

// Using alternative icons for Mountain and Tree
const MountainOutlined = EnvironmentOutlined; // Using EnvironmentOutlined as a fallback for Mountain
const TreeOutlined = EnvironmentOutlined; // Using EnvironmentOutlined as a fallback for Tree
const TeamOutlined = EnvironmentOutlined; // Using EnvironmentOutlined as a fallback for Team
import './TrekQuiz.css';

const { Title, Text } = Typography;

const questions = [
  {
    id: 1,
    question: 'What is your trekking experience level?',
    icon: <FireFilled />,
    options: [
      { 
        value: 'beginner', 
        label: 'Beginner (First time trekking)',
        icon: <FireFilled style={{ color: '#52c41a' }} />
      },
      { 
        value: 'intermediate', 
        label: 'Intermediate (Some trekking experience)',
        icon: <FireFilled style={{ color: '#faad14' }} />
      },
      { 
        value: 'advanced', 
        label: 'Advanced (Regular trekker)',
        icon: <FireFilled style={{ color: '#fa8c16' }} />
      },
      { 
        value: 'expert', 
        label: 'Expert (Challenging treks preferred)',
        icon: <FireFilled style={{ color: '#f5222d' }} />
      },
    ],
  },
  {
    id: 2,
    question: 'How many days can you allocate for trekking?',
    icon: <CalendarOutlined />,
    options: [
      { 
        value: '3-5', 
        label: '3-5 days',
        icon: <span className="day-count">3-5</span>
      },
      { 
        value: '6-10', 
        label: '6-10 days',
        icon: <span className="day-count">6-10</span>
      },
      { 
        value: '11-15', 
        label: '11-15 days',
        icon: <span className="day-count">11-15</span>
      },
      { 
        value: '15+', 
        label: '15+ days',
        icon: <span className="day-count">15+</span>
      },
    ],
  },
  {
    id: 3,
    question: 'Do you prefer to travel in a group or solo?',
    icon: <TeamOutlined />,
    options: [
      { 
        value: 'solo', 
        label: 'Solo Traveler',
        icon: '👤',
        description: 'I prefer to explore on my own at my own pace'
      },
      { 
        value: 'small-group', 
        label: 'Small Group (2-4 people)', 
        icon: '👥',
        description: 'I enjoy the company of a few close friends or family'
      },
      { 
        value: 'medium-group', 
        label: 'Medium Group (5-10 people)',
        icon: '👥👥',
        description: 'I like meeting new people and making friends'
      },
      { 
        value: 'large-group',
        label: 'Large Group (10+ people)', 
        icon: '👥👥👥',
        description: 'I love the energy of a big group'
      }
    ],
  },
  {
    id: 4,
    question: 'What type of scenery do you prefer?',
    icon: <MountainOutlined />,
    options: [
      { 
        value: 'mountain', 
        label: 'High mountain peaks',
        icon: <MountainOutlined style={{ color: '#722ed1' }} />
      },
      { 
        value: 'valley', 
        label: 'Valleys and rivers',
        icon: <EnvironmentOutlined style={{ color: '#13c2c2' }} />
      },
      { 
        value: 'forest', 
        label: 'Lush forests',
        icon: <TreeOutlined style={{ color: '#52c41a' }} />
      },
      { 
        value: 'cultural', 
        label: 'Cultural villages',
        icon: <HomeOutlined style={{ color: '#fa8c16' }} />
      },
    ],
  },
  {
    id: 5,
    question: 'What is your maximum comfortable altitude?',
    icon: <FlagFilled />,
    options: [
      { 
        value: '3000', 
        label: 'Below 3,000m',
        icon: <span className="altitude">3,000m</span>,
        level: 'Low'
      },
      { 
        value: '4000', 
        label: '3,000m - 4,000m',
        icon: <span className="altitude">4,000m</span>,
        level: 'Moderate'
      },
      { 
        value: '5000', 
        label: '4,000m - 5,000m',
        icon: <span className="altitude">5,000m</span>,
        level: 'High'
      },
      { 
        value: '5500+', 
        label: '5,000m+',
        icon: <span className="altitude">5,000m+</span>,
        level: 'Extreme'
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
  const [questionEnter, setQuestionEnter] = useState(true);
  const navigate = useNavigate();
  
  // Animation for question transitions
  useEffect(() => {
    setQuestionEnter(true);
    const timer = setTimeout(() => setQuestionEnter(false), 100);
    return () => clearTimeout(timer);
  }, [currentQuestion]);

  const handleAnswer = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateRecommendation = () => {
    // Simple scoring system - in a real app, this would be more sophisticated
    const score = {
      beginner: 0,
      intermediate: 0,
      advanced: 0,
    };

    // Score based on experience level (heaviest weight)
    if (answers[1] === 'beginner') score.beginner += 3;
    else if (answers[1] === 'intermediate') score.intermediate += 2;
    else if (answers[1] === 'advanced') score.advanced += 3;
    else if (answers[1] === 'expert') score.advanced += 4;

    // Score based on duration
    if (answers[2] === '3-5') score.beginner += 2;
    else if (answers[2] === '6-10') score.intermediate += 2;
    else if (answers[2] === '11-15') score.advanced += 2;
    else if (answers[2] === '15+') score.advanced += 3;

    // Score based on altitude
    if (answers[5] === '3000') score.beginner += 2;
    else if (answers[5] === '4000') score.intermediate += 2;
    else if (answers[5] === '5000') score.advanced += 2;
    else if (answers[5] === '5500+') score.advanced += 3;

    // Determine the highest score
    let maxScore = Math.max(score.beginner, score.intermediate, score.advanced);
    let result = 'intermediate'; // default

    if (score.beginner === maxScore) result = 'beginner';
    else if (score.advanced === maxScore) result = 'advanced';

    setRecommendation(recommendations[result]);
    setShowResult(true);
  };

  const handleSubmit = () => {
    if (currentQuestion === questions.length - 1) {
      calculateRecommendation();
    } else {
      nextQuestion();
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQuestionData = questions[currentQuestion];
  const currentAnswer = answers[currentQuestionData?.id];
  
  // Get icon for the current question
  const QuestionIcon = currentQuestionData?.icon || <StarFilled />;

  if (showResult && recommendation) {
    return (
      <div className="quiz-container">
        <Card className="quiz-card">
          <Result
            status="success"
            title="Your Trek Recommendation"
            subTitle={recommendation.description}
            extra={[
              <Button 
                type="primary" 
                key="explore" 
                onClick={() => navigate('/treks')}
                icon={<CheckCircleFilled />}
              >
                Explore Recommended Treks
              </Button>,
              <Button 
                key="back" 
                onClick={() => {
                  setShowResult(false);
                  setCurrentQuestion(0);
                  setAnswers({});
                }}
              >
                Retake Quiz
              </Button>,
            ]}
          >
            <div className="recommendations">
              {recommendation.treks.map((trek, index) => (
                <Card key={index} style={{ marginBottom: 16 }}>
                  <Title level={4}>{trek.name || trek}</Title>
                  {trek.duration && <p><strong>Duration:</strong> {trek.duration}</p>}
                  {trek.maxAltitude && <p><strong>Max Altitude:</strong> {trek.maxAltitude}</p>}
                </Card>
              ))}
            </div>
          </Result>
        </Card>
      </div>
    );
  }

  return (
    <div className={`quiz-container ${questionEnter ? 'question-enter' : ''}`}>
      <Card className="quiz-card">
        <div className="quiz-header">
          <Button 
            type="text" 
            className="back-button"
            icon={<ArrowLeftOutlined />} 
            onClick={() => currentQuestion === 0 ? navigate(-1) : prevQuestion()}
          >
            {currentQuestion === 0 ? 'Back to Home' : 'Previous'}
          </Button>
          <div className="quiz-progress">
            <span className="question-count">Question {currentQuestion + 1} of {questions.length}</span>
            <Progress 
              percent={progress} 
              showInfo={false} 
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              strokeWidth={8}
              className="progress-bar"
            />
          </div>
        </div>


        <div className="question-container">
          <div className="question-header">
            <div className="question-icon">
              {QuestionIcon}
            </div>
            <Title level={3} className="question-title">{currentQuestionData.question}</Title>
          </div>
          
          <div className="options-grid">
            {currentQuestionData.options.map((option, index) => (
              <div 
                key={index} 
                className={`option-card ${currentAnswer === option.value ? 'selected' : ''}`}
                onClick={() => handleAnswer(currentQuestionData.id, option.value)}
              >
                <div className="option-icon">
                  {option.icon || <StarFilled />}
                  {option.level && <span className="level-badge">{option.level}</span>}
                </div>
                <div className="option-label">{option.label}</div>
                {currentAnswer === option.value && (
                  <div className="checkmark">
                    <CheckOutlined />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="quiz-actions">
          <Button 
            type="primary" 
            onClick={handleSubmit}
            disabled={!currentAnswer}
            size="large"
            className={`next-button ${!currentAnswer ? 'disabled' : ''}`}
            icon={currentQuestion === questions.length - 1 ? <ThunderboltFilled /> : null}
          >
            {currentQuestion === questions.length - 1 ? 'Get Recommendations' : 'Next'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TrekQuiz;
