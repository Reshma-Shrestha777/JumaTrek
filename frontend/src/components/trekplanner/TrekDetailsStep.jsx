import React from 'react';
import { 
  Row, 
  Col, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Card, 
  Typography, 
  Slider, 
  Divider,
  Tooltip
} from 'antd';
import { 
  EnvironmentOutlined, 
  ClockCircleOutlined, 
  FireOutlined, 
  GlobalOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
  CompassOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { Text, Title, Paragraph } = Typography;

const TrekDetailsStep = ({ formData, onInputChange, popularTreks }) => {
  const calculateEndDate = (startDate, duration) => {
    if (!startDate) return null;
    return dayjs(startDate).add(duration - 1, 'day');
  };

  const handleDateChange = (date) => {
    onInputChange('startDate', date);
    if (formData.duration > 0) {
      onInputChange('endDate', calculateEndDate(date, formData.duration));
    }
  };

  const handleDurationChange = (value) => {
    onInputChange('duration', value);
    if (formData.startDate) {
      onInputChange('endDate', calculateEndDate(formData.startDate, value));
    }
  };

  const renderTrekInfo = () => {
    if (formData.destination === 'everest_base_camp') {
      return (
        <div className="trek-info-content">
          <div className="trek-header">
            <h3 className="trek-title">Everest Base Camp Trek</h3>
            <div className="trek-highlights">
              <Tag color="blue" className="trek-tag"><ClockCircleOutlined /> 12-14 days</Tag>
              <Tag color="green" className="trek-tag"><EnvironmentOutlined /> Max 5,545m</Tag>
              <Tag color="orange" className="trek-tag"><FireOutlined /> Challenging</Tag>
            </div>
          </div>
          <Paragraph className="trek-description">
            The classic trek to the base of the world's highest mountain. Experience Sherpa culture, 
            stunning Himalayan views, and the famous Namche Bazaar. This iconic journey takes you through 
            beautiful Sherpa villages, ancient monasteries, and breathtaking landscapes.
          </Paragraph>
          <Divider className="info-divider" />
          <div className="trek-details">
            <div className="detail-item">
              <div className="detail-icon"><ClockCircleOutlined /></div>
              <div>
                <div className="detail-label">Duration</div>
                <div className="detail-value">12-14 days</div>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-icon"><EnvironmentOutlined /></div>
              <div>
                <div className="detail-label">Max Altitude</div>
                <div className="detail-value">5,364m (17,598 ft)</div>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-icon"><FireOutlined /></div>
              <div>
                <div className="detail-label">Difficulty</div>
                <div className="detail-value">Challenging</div>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-icon"><GlobalOutlined /></div>
              <div>
                <div className="detail-label">Best Season</div>
                <div className="detail-value">Mar-May, Sep-Nov</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (formData.destination === 'custom' && formData.customDestination) {
      return (
        <div className="trek-info-content">
          <h3 className="trek-title">Custom Trek: {formData.customDestination}</h3>
          <Paragraph className="trek-description">
            We'll work with you to create a personalized trekking experience based on your preferences.
            Our experts will contact you to discuss the details and create a custom itinerary tailored to 
            your fitness level, interests, and schedule.
          </Paragraph>
          <div className="custom-trek-features">
            <div className="feature-item">
              <CheckCircleOutlined className="feature-icon" />
              <span>Personalized Itinerary</span>
            </div>
            <div className="feature-item">
              <CheckCircleOutlined className="feature-icon" />
              <span>Flexible Duration</span>
            </div>
            <div className="feature-item">
              <CheckCircleOutlined className="feature-icon" />
              <span>Custom Difficulty Level</span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="trek-info-content">
          <div className="empty-state">
            <CompassOutlined className="empty-icon" />
            <h3 className="empty-title">Select a Trek</h3>
            <p className="empty-description">
              Choose from our popular treks or create a custom adventure. 
              Each trek includes detailed information to help you make the best choice.
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="step-content">
      <div className="text-center mb-8">
        <Title level={3} className="flex items-center justify-center">
          <EnvironmentOutlined className="mr-2 text-blue-500" />
          Trek Details
        </Title>
        <Text type="secondary" className="text-base">
          Start planning your perfect trekking adventure
        </Text>
      </div>
      
      <Row gutter={[32, 24]}>
        <Col xs={24} md={12}>
          <Card 
            className="trek-selection-card"
            title={
              <div className="flex items-center">
                <div className="card-icon">
                  <EnvironmentOutlined />
                </div>
                <h4 className="card-title">Trek Selection</h4>
              </div>
            }
          >
            <div className="form-section">
              <Form.Item
                label={
                  <div className="form-label">
                    <span>Select Trek</span>
                    <Tooltip title="Choose from our popular treks or select custom">
                      <InfoCircleOutlined className="info-icon" />
                    </Tooltip>
                  </div>
                }
                name="destination"
                rules={[{ required: true, message: 'Please select a trek' }]}
              >
                <Select
                  className="trek-select"
                  placeholder="Select a popular trek or choose custom"
                  onChange={(value) => onInputChange('destination', value)}
                  value={formData.destination}
                  showSearch
                  optionFilterProp="label"
                  size="large"
                >
                  {popularTreks.map(trek => (
                    <Option key={trek.value} value={trek.value}>
                      <div className="option-content">
                        <div className="option-title">{trek.label}</div>
                        {trek.duration && (
                          <div className="option-duration">{trek.duration} days</div>
                        )}
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              
              {formData.destination === 'custom' && (
                <Form.Item
                  label={
                    <div className="form-label">
                      <span>Custom Destination</span>
                      <Tooltip title="Tell us about your dream trek destination">
                        <InfoCircleOutlined className="info-icon" />
                      </Tooltip>
                    </div>
                  }
                  name="customDestination"
                  rules={[
                    { 
                      required: formData.destination === 'custom', 
                      message: 'Please specify your custom destination' 
                    }
                  ]}
                >
                  <Input 
                    className="custom-destination-input"
                    placeholder="Enter your custom trek destination"
                    onChange={(e) => onInputChange('customDestination', e.target.value)}
                    value={formData.customDestination}
                    size="large"
                  />
                </Form.Item>
              )}
              
              <div className="date-duration-section">
                <Form.Item
                  className="date-picker-item"
                  label={
                    <div className="form-label">
                      <span>Start Date</span>
                      <Tooltip title="Select your preferred start date">
                        <InfoCircleOutlined className="info-icon" />
                      </Tooltip>
                    </div>
                  }
                  name="startDate"
                  rules={[{ required: true, message: 'Please select a start date' }]}
                >
                  <DatePicker 
                    className="date-picker"
                    onChange={handleDateChange}
                    disabledDate={(current) => {
                      return current && current < dayjs().startOf('day');
                    }}
                    size="large"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                
                <Form.Item
                  className="duration-slider-item"
                  label={
                    <div className="form-label">
                      <span>Trek Duration: {formData.duration} days</span>
                      <Tooltip title="Adjust the slider to set your trek duration">
                        <InfoCircleOutlined className="info-icon" />
                      </Tooltip>
                    </div>
                  }
                  name="duration"
                  rules={[{ required: true, message: 'Please select trek duration' }]}
                >
                  <Slider
                    className="duration-slider"
                    min={1}
                    max={30}
                    marks={{
                      1: '1',
                      5: '5',
                      10: '10',
                      15: '15',
                      20: '20',
                      25: '25',
                      30: '30+'
                    }}
                    onChange={handleDurationChange}
                    value={formData.duration}
                    tooltip={{ formatter: (value) => `${value} days` }}
                  />
                </Form.Item>
              </div>
              
              {formData.startDate && formData.duration > 0 && (
                <div className="date-summary">
                  <div className="date-summary-icon">
                    <CalendarOutlined />
                  </div>
                  <div className="date-summary-content">
                    <div className="date-summary-label">Your Trek Dates</div>
                    <div className="date-summary-dates">
                      {dayjs(formData.startDate).format('MMM D, YYYY')} - {formData.endDate.format('MMM D, YYYY')}
                    </div>
                    <div className="date-summary-duration">
                      {formData.duration} {formData.duration === 1 ? 'day' : 'days'} total
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </Col>
        
        <Col xs={24} md={12}>
          <Card 
            className="trek-info-card"
            title={
              <div className="flex items-center">
                <div className="card-icon">
                  <CompassOutlined />
                </div>
                <h4 className="card-title">Trek Information</h4>
              </div>
            }
          >
            {renderTrekInfo()}
          </Card>
        </Col>
      </Row>
      
      <style jsx>{`
        .trek-selection-card,
        .trek-info-card {
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          margin-bottom: 24px;
          height: 100%;
        }
        
        .card-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background-color: #eef2ff;
          color: #4f46e5;
          margin-right: 12px;
        }
        
        .card-title {
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }
        
        .form-section {
          padding: 8px 0;
        }
        
        .form-label {
          display: flex;
          align-items: center;
          font-weight: 500;
          color: #334155;
          font-size: 14px;
          margin-bottom: 6px;
        }
        
        .info-icon {
          margin-left: 6px;
          color: #94a3b8;
          font-size: 14px;
          cursor: help;
        }
        
        .date-duration-section {
          margin: 24px 0;
        }
        
        .date-picker-item {
          margin-bottom: 24px;
        }
        
        .duration-slider {
          margin-top: 8px;
        }
        
        .date-summary {
          display: flex;
          align-items: center;
          background-color: #f8fafc;
          border-radius: 8px;
          padding: 16px;
          margin-top: 16px;
        }
        
        .date-summary-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background-color: #e0e7ff;
          color: #4f46e5;
          margin-right: 16px;
          font-size: 18px;
        }
        
        .date-summary-content {
          flex: 1;
        }
        
        .date-summary-label {
          font-size: 12px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }
        
        .date-summary-dates {
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 2px;
        }
        
        .date-summary-duration {
          font-size: 13px;
          color: #64748b;
        }
        
        .trek-info-content {
          padding: 8px 0;
        }
        
        .trek-header {
          margin-bottom: 16px;
        }
        
        .trek-title {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 12px 0;
        }
        
        .trek-highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }
        
        .trek-tag {
          display: inline-flex;
          align-items: center;
          font-size: 12px;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 4px;
        }
        
        .trek-tag :global(.anticon) {
          margin-right: 4px;
          font-size: 12px;
        }
        
        .trek-description {
          color: #475569;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        
        .info-divider {
          margin: 20px 0;
          border-color: #e2e8f0;
        }
        
        .trek-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        
        .detail-item {
          display: flex;
          align-items: flex-start;
        }
        
        .detail-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background-color: #f1f5f9;
          color: #4f46e5;
          margin-right: 12px;
          flex-shrink: 0;
        }
        
        .detail-label {
          font-size: 12px;
          color: #64748b;
          margin-bottom: 2px;
        }
        
        .detail-value {
          font-size: 14px;
          font-weight: 500;
          color: #1e293b;
        }
        
        .custom-trek-features {
          margin-top: 20px;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          color: #475569;
        }
        
        .feature-icon {
          color: #10b981;
          margin-right: 10px;
          font-size: 16px;
        }
        
        .empty-state {
          text-align: center;
          padding: 30px 0;
        }
        
        .empty-icon {
          font-size: 48px;
          color: #cbd5e1;
          margin-bottom: 16px;
        }
        
        .empty-title {
          font-size: 16px;
          font-weight: 600;
          color: #334155;
          margin: 0 0 8px 0;
        }
        
        .empty-description {
          color: #94a3b8;
          font-size: 14px;
          margin: 0;
          max-width: 300px;
          margin: 0 auto;
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .trek-selection-card,
          .trek-info-card {
            margin-bottom: 16px;
          }
          
          .trek-details {
            grid-template-columns: 1fr;
          }
          
          .date-summary {
            flex-direction: column;
            text-align: center;
          }
          
          .date-summary-icon {
            margin: 0 auto 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default TrekDetailsStep;
