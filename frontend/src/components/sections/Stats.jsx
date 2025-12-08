import React, { useEffect, useState } from 'react';
import { FaMountain, FaUsers, FaChartLine, FaRoute } from 'react-icons/fa';

const Stats = () => {
  const [counts, setCounts] = useState({
    trekkers: 0,
    years: 0,
    success: 0,
    routes: 0
  });

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepTime = duration / steps;
    
    const targetValues = {
      trekkers: 2500,
      years: 15,
      success: 98,
      routes: 45
    };

    const stepValues = {
      trekkers: targetValues.trekkers / steps,
      years: targetValues.years / steps,
      success: targetValues.success / steps,
      routes: targetValues.routes / steps
    };

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setCounts({
        trekkers: Math.min(Math.floor(stepValues.trekkers * currentStep), targetValues.trekkers),
        years: Math.min(Math.floor(stepValues.years * currentStep), targetValues.years),
        success: Math.min(Math.floor(stepValues.success * currentStep), targetValues.success),
        routes: Math.min(Math.floor(stepValues.routes * currentStep), targetValues.routes)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <FaUsers className="icon" />
            </div>
            <div className="stat-content">
              <span className="stat-number">{counts.trekkers.toLocaleString()}+</span>
              <span className="stat-label">Happy Trekkers</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <FaMountain className="icon" />
            </div>
            <div className="stat-content">
              <span className="stat-number">{counts.years}+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <FaChartLine className="icon" />
            </div>
            <div className="stat-content">
              <span className="stat-number">{counts.success}%</span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <FaRoute className="icon" />
            </div>
            <div className="stat-content">
              <span className="stat-number">{counts.routes}+</span>
              <span className="stat-label">Trek Routes</span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .stats-section {
          padding: 4rem 0;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          position: relative;
          overflow: hidden;
          border-radius: 15px;
          
        }
        
        .stats-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('/images/mountain-pattern.png') center/cover;
          opacity: 0.03;
          pointer-events: none;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          position: relative;
          z-index: 1;
        }
        
        .stat-card {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 2rem 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        
        .stat-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #ff7e5f, #feb47b);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        }
        
        .stat-card:hover::after {
          transform: scaleX(1);
        }
        
        .stat-icon {
          width: 70px;
          height: 70px;
          background: rgba(255, 126, 95, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        
        .icon {
          font-size: 2rem;
          color: #ff7e5f;
        }
        
        .stat-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
          background: linear-gradient(90deg, #ff7e5f, #feb47b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .stat-label {
          font-size: 1rem;
          color: #e6e6e6;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        @media (max-width: 768px) {
          .stats-section {
            padding: 3rem 0;
          }
          
          .stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
          
          .stat-card {
            padding: 1.5rem 1rem;
          }
          
          .stat-number {
            font-size: 2rem;
          }
        }
        
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Stats;