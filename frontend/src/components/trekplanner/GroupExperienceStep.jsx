import React from 'react';
import { 
  Row, 
  Col, 
  Form, 
  InputNumber, 
  Select, 
  Card, 
  Typography, 
  Divider, 
  Alert, 
  Steps, 
  Tag, 
  Progress,
  Tooltip
} from 'antd';
import { 
  TeamOutlined, 
  SafetyOutlined, 
  HeartOutlined, 
  ToolOutlined,
  InfoCircleOutlined,
  UserOutlined,
  HeartFilled,
  StarFilled
} from '@ant-design/icons';

const { Option } = Select;
const { Text, Title, Paragraph } = Typography;
const { Step } = Steps;

const GroupExperienceStep = ({ formData, onInputChange, groupTypes, experienceLevels, fitnessLevels }) => {
  // Helper function to get fitness tips based on level
  const getFitnessTips = (level) => {
    const tips = {
      low: 'Consider starting with easier trails and gradually increasing difficulty.',
      average: 'You can handle moderate trails with some elevation gain. Consider training for more challenging treks.',
      good: 'You\'re ready for most treks. Consider high-altitude challenges with proper acclimatization.',
      excellent: 'You can tackle the most challenging treks, including high-altitude and technical routes.'
    };
    return tips[level] || 'Select your fitness level to see personalized recommendations.';
  };
  const getExperienceProgress = (level) => {
    const levels = { beginner: 0, intermediate: 33, experienced: 66, expert: 100 };
    return levels[level] || 0;
  };

  const getFitnessLevel = (level) => {
    const levels = {
      low: { color: 'red', text: 'Low' },
      average: { color: 'orange', text: 'Average' },
      good: { color: 'blue', text: 'Good' },
      excellent: { color: 'green', text: 'Excellent' }
    };
    return levels[level] || { color: 'gray', text: 'Not specified' };
  };

  return (
    <div className="step-content group-experience-step">
      <div className="text-center mb-8">
        <Title level={3} className="flex items-center justify-center">
          <TeamOutlined className="mr-2 text-blue-500" />
          Group & Experience
        </Title>
        <Text type="secondary" className="text-base">
          Tell us about your group to help us plan the perfect trekking experience
        </Text>
      </div>
      
      <Row gutter={[32, 24]}>
        <Col xs={24} md={12}>
          <Card 
            className="shadow-sm border-0 mb-6"
            title={
              <div className="flex items-center">
                <UserOutlined className="text-blue-500 mr-2" />
                <span>Group Information</span>
              </div>
            }
          >
            <div className="space-y-6">
              <Form.Item
                label={
                  <div className="flex items-center">
                    <span>Group Size</span>
                    <Tooltip title="Number of people in your group">
                      <InfoCircleOutlined className="ml-2 text-gray-400" />
                    </Tooltip>
                  </div>
                }
                name="groupSize"
                rules={[{ required: true, message: 'Please enter group size' }]}
              >
                <InputNumber 
                  min={1} 
                  max={20}
                  size="large"
                  className="w-full"
                  onChange={(value) => onInputChange('groupSize', value)}
                  value={formData.groupSize}
                />
              </Form.Item>
              
              <Form.Item
                label={
                  <div className="flex items-center">
                    <span>Group Type</span>
                    <Tooltip title="Select the category that best describes your group">
                      <InfoCircleOutlined className="ml-2 text-gray-400" />
                    </Tooltip>
                  </div>
                }
                name="groupType"
                rules={[{ required: true, message: 'Please select group type' }]}
              >
                <Select
                  size="large"
                  onChange={(value) => onInputChange('groupType', value)}
                  value={formData.groupType}
                >
                  {groupTypes.map(type => (
                    <Option key={type.value} value={type.value}>
                      {type.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Form.Item
                label={
                  <div className="flex items-center">
                    <span>Age Range</span>
                    <Tooltip title="Age range of participants in your group">
                      <InfoCircleOutlined className="ml-2 text-gray-400" />
                    </Tooltip>
                  </div>
                }
                name="ageRange"
              >
                <div className="flex items-center space-x-3">
                  <InputNumber 
                    min={5} 
                    max={80}
                    size="large"
                    placeholder="Min"
                    className="flex-1"
                    value={formData.ageRange?.min}
                    onChange={(value) => onInputChange('ageRange', { 
                      ...formData.ageRange, 
                      min: value 
                    })}
                  />
                  <span className="text-gray-500">to</span>
                  <InputNumber 
                    min={5} 
                    max={80}
                    size="large"
                    placeholder="Max"
                    className="flex-1"
                    value={formData.ageRange?.max}
                    onChange={(value) => onInputChange('ageRange', { 
                      ...formData.ageRange, 
                      max: value 
                    })}
                  />
                  <span className="text-gray-500">years</span>
                </div>
              </Form.Item>
            </div>
          </Card>
          
          <Card 
            className="experience-fitness-card"
            title={
              <div className="flex items-center">
                <div className="experience-fitness-icon">
                  <StarFilled />
                </div>
                <h4 className="experience-fitness-title">Experience & Fitness</h4>
              </div>
            }
          >
            <div className="experience-fitness-content">
              {/* Experience Level Section */}
              <div className="form-section">
                <Form.Item
                  label={
                    <div className="form-label">
                      <span>Trekking Experience</span>
                      <Tooltip title="Select your group's highest trekking experience level">
                        <InfoCircleOutlined className="info-icon" />
                      </Tooltip>
                    </div>
                  }
                  name="experienceLevel"
                  rules={[{ required: true, message: 'Please select experience level' }]}
                >
                  <Select
                    className="experience-select"
                    size="large"
                    onChange={(value) => onInputChange('experienceLevel', value)}
                    value={formData.experienceLevel}
                    placeholder="Select experience level"
                  >
                    {experienceLevels.map(level => (
                      <Option key={level.value} value={level.value}>
                        <div className="option-content">
                          <div className="option-title">{level.label}</div>
                          <div className="option-description">{level.description}</div>
                        </div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                
                {formData.experienceLevel && (
                  <div className="experience-level-indicator">
                    <div className="level-header">
                      <span className="level-label">Experience Level</span>
                      <span className="level-value">
                        {experienceLevels.find(l => l.value === formData.experienceLevel)?.label}
                      </span>
                    </div>
                    <Progress 
                      percent={getExperienceProgress(formData.experienceLevel)} 
                      showInfo={false}
                      strokeColor="#4f46e5"
                      trailColor="#e0e7ff"
                      className="experience-progress"
                    />
                    <div className="level-scale">
                      <span>Beginner</span>
                      <span>Expert</span>
                    </div>
                  </div>
                )}
              </div>

              <Divider className="section-divider" />

              {/* Fitness Level Section */}
              <div className="form-section">
                <Form.Item
                  label={
                    <div className="form-label">
                      <span>Fitness Level</span>
                      <Tooltip title="Select your group's average fitness level">
                        <InfoCircleOutlined className="info-icon" />
                      </Tooltip>
                    </div>
                  }
                  name="fitnessLevel"
                  rules={[{ required: true, message: 'Please select fitness level' }]}
                >
                  <Select
                    className="fitness-select"
                    size="large"
                    onChange={(value) => onInputChange('fitnessLevel', value)}
                    value={formData.fitnessLevel}
                    placeholder="Select fitness level"
                  >
                    {fitnessLevels.map(level => (
                      <Option key={level.value} value={level.value}>
                        <div className="option-content">
                          <div className="option-title">{level.label}</div>
                          <div className="option-description">{level.description}</div>
                        </div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                
                {formData.fitnessLevel && (
                  <div className="fitness-assessment">
                    <div className="assessment-content">
                      <span className="assessment-label">Fitness Assessment:</span>
                      <Tag 
                        color={getFitnessLevel(formData.fitnessLevel).color} 
                        className="fitness-tag"
                      >
                        {getFitnessLevel(formData.fitnessLevel).text}
                      </Tag>
                    </div>
                    <div className="fitness-tips">
                      {getFitnessTips(formData.fitnessLevel)}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <style jsx>{`
              .experience-fitness-card {
                border-radius: 12px;
                border: 1px solid #e2e8f0;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                margin-bottom: 24px;
                overflow: hidden;
              }
              
              .experience-fitness-card :global(.ant-card-head) {
                background-color: #f8fafc;
                border-bottom: 1px solid #e2e8f0;
                padding: 0 20px;
                min-height: 60px;
              }
              
              .experience-fitness-card :global(.ant-card-head-title) {
                padding: 16px 0;
              }
              
              .experience-fitness-icon {
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
              
              .experience-fitness-title {
                font-size: 16px;
                font-weight: 600;
                color: #1e293b;
                margin: 0;
              }
              
              .experience-fitness-content {
                padding: 4px 0;
              }
              
              .form-section {
                margin-bottom: 24px;
              }
              
              .form-section:last-child {
                margin-bottom: 0;
              }
              
              .form-label {
                display: flex;
                align-items: center;
                font-weight: 500;
                color: #334155;
                font-size: 14px;
              }
              
              .info-icon {
                margin-left: 6px;
                color: #94a3b8;
                font-size: 14px;
                cursor: help;
              }
              
              .option-content {
                padding: 8px 0;
              }
              
              .option-title {
                font-weight: 500;
                color: #1e293b;
                margin-bottom: 2px;
              }
              
              .option-description {
                font-size: 12px;
                color: #64748b;
                line-height: 1.4;
              }
              
              .experience-level-indicator {
                background-color: #f8fafc;
                border-radius: 8px;
                padding: 16px;
                margin-top: 16px;
              }
              
              .level-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
                font-size: 13px;
                color: #64748b;
              }
              
              .level-value {
                font-weight: 600;
                color: #4f46e5;
              }
              
              .experience-progress {
                margin: 8px 0 4px;
              }
              
              .level-scale {
                display: flex;
                justify-content: space-between;
                font-size: 11px;
                color: #94a3b8;
                margin-top: 4px;
              }
              
              .section-divider {
                margin: 24px 0;
                border-color: #e2e8f0;
              }
              
              .fitness-assessment {
                background-color: #f8fafc;
                border-radius: 8px;
                padding: 16px;
                margin-top: 16px;
              }
              
              .assessment-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 8px;
              }
              
              .assessment-label {
                font-size: 13px;
                color: #64748b;
              }
              
              .fitness-tag {
                font-weight: 600;
                padding: 4px 10px;
                border-radius: 4px;
                font-size: 13px;
                text-transform: capitalize;
              }
              
              .fitness-tips {
                font-size: 13px;
                color: #475569;
                line-height: 1.5;
              }
              
              /* Responsive styles */
              @media (max-width: 768px) {
                .experience-fitness-card {
                  margin-bottom: 16px;
                }
                
                .form-section {
                  margin-bottom: 20px;
                }
                
                .section-divider {
                  margin: 20px 0;
                }
              }
            `}</style>
          </Card>
        </Col>
        
        <Col xs={24} md={12}>
          <div className="sticky top-6 space-y-6">
            <Card 
              className="shadow-sm border-0"
              title={
                <div className="flex items-center">
                  <SafetyOutlined className="text-red-500 mr-2" />
                  <span>Safety & Recommendations</span>
                </div>
              }
            >
              <div className="space-y-5">
                <Alert
                  message="Altitude Sickness Warning"
                  description="Most treks in Nepal reach high altitudes. Proper acclimatization is crucial to prevent AMS (Acute Mountain Sickness)."
                  type="warning"
                  showIcon
                  className="mb-2"
                />
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="font-medium text-blue-800 mb-2">
                    <HeartFilled className="text-red-500 mr-2" />
                    Personalized Recommendations
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {formData.experienceLevel === 'beginner' && (
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Start with a shorter trek to acclimate to the altitude</span>
                      </li>
                    )}
                    {formData.ageRange?.max > 50 && (
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Additional rest days for better acclimatization</span>
                      </li>
                    )}
                    {formData.groupType === 'family' && (
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Family-friendly routes with shorter walking days</span>
                      </li>
                    )}
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Proper travel insurance covering high-altitude trekking</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Pre-trek fitness preparation program</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <SafetyOutlined className="text-blue-600 text-lg" />
                    </div>
                    <div>
                      <Text strong className="block">Safety First</Text>
                      <Paragraph className="text-sm text-gray-600 mt-1 mb-0">
                        Our guides are trained in wilderness first aid and carry comprehensive first aid kits. 
                        We monitor altitude sickness symptoms and have emergency evacuation plans in place.
                      </Paragraph>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <HeartOutlined className="text-green-600 text-lg" />
                    </div>
                    <div>
                      <Text strong className="block">Responsible Tourism</Text>
                      <Paragraph className="text-sm text-gray-600 mt-1 mb-0">
                        We follow Leave No Trace principles, support local communities, and ensure fair treatment 
                        and proper equipment for all our staff.
                      </Paragraph>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-2 rounded-lg mr-3">
                      <ToolOutlined className="text-amber-600 text-lg" />
                    </div>
                    <div>
                      <Text strong className="block">Quality Equipment</Text>
                      <Paragraph className="text-sm text-gray-600 mt-1 mb-0">
                        We use high-quality, well-maintained equipment for all our treks. Tents, sleeping bags, 
                        and other gear are regularly inspected and replaced as needed.
                      </Paragraph>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mt-6">
                  <div className="font-medium text-gray-800 mb-2">Need help choosing?</div>
                  <Paragraph className="text-sm text-gray-600 mb-0">
                    Our trekking experts can help you select the perfect trek based on your group's 
                    experience and fitness levels. Contact us for personalized recommendations.
                  </Paragraph>
                </div>
              </div>
            </Card>
            
            <Card className="shadow-sm border-0">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-600 mb-3">Support Available</div>
                <div className="text-sm text-gray-500">
                  Have questions? Our team is here to help you plan your perfect trekking adventure.
                </div>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
      
      <style jsx global>{`
        .group-experience-step .ant-card {
          border-radius: 10px;
          overflow: hidden;
        }
        
        .group-experience-step .ant-card-head {
          border-bottom: 1px solid #f0f0f0;
          background: #fafafa;
        }
        
        .group-experience-step .ant-card-head-title {
          font-weight: 500;
          color: #2d3748;
        }
        
        .group-experience-step .ant-form-item-label > label {
          color: #4a5568;
          font-weight: 500;
        }
        
        .group-experience-step .ant-input-number,
        .group-experience-step .ant-select-selector {
          border-radius: 8px;
          height: 44px;
          display: flex;
          align-items: center;
        }
        
        .group-experience-step .ant-input-number-input {
          height: 100%;
        }
        
        .group-experience-step .ant-tag {
          padding: 0 10px;
          border-radius: 4px;
          font-size: 13px;
          height: 28px;
          line-height: 26px;
        }
        
        @media (max-width: 768px) {
          .group-experience-step .ant-col-md-12 {
            padding: 0 8px !important;
          }
          
          .group-experience-step .ant-card {
            margin-bottom: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default GroupExperienceStep;
