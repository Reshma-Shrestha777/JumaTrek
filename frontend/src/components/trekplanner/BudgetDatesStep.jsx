import React from 'react';
import { Row, Col, Card, Form, Select, DatePicker, InputNumber, Typography, Divider, Slider } from 'antd';
import { DollarOutlined, CalendarOutlined, InfoCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { Text, Title, Paragraph } = Typography;

const BudgetDatesStep = ({ 
  formData, 
  onInputChange, 
  budgetRanges 
}) => {
  const calculateEndDate = (startDate, duration) => {
    if (!startDate) return null;
    return dayjs(startDate).add(duration - 1, 'day');
  };

  const handleBudgetRangeChange = (value) => {
    const range = budgetRanges.find(r => r.value === value);
    onInputChange('budgetRange', value);
    onInputChange('budgetAmount', Math.round((range.min + range.max) / 2));
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

  const getSeason = (month) => {
    if (month >= 2 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'monsoon';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
  };

  const getSeasonInfo = (season) => {
    const seasons = {
      spring: {
        name: 'Spring',
        months: 'March to May',
        description: 'Mild temperatures, blooming rhododendrons, clear mountain views',
        pros: 'Pleasant weather, beautiful flowers, good visibility',
        cons: 'More crowded, book in advance',
        icon: '🌸',
        bestFor: 'Photography, nature lovers'
      },
      autumn: {
        name: 'Autumn',
        months: 'September to November',
        description: 'Stable weather, clear skies, excellent mountain views',
        pros: 'Best visibility, comfortable temperatures, major festivals',
        cons: 'Most popular time, higher prices',
        icon: '🍂',
        bestFor: 'Trekking, photography, cultural experiences'
      },
      winter: {
        name: 'Winter',
        months: 'December to February',
        description: 'Cold temperatures, especially at night, snow at higher elevations',
        pros: 'Fewer trekkers, clear views, unique winter landscapes',
        cons: 'Very cold, some high passes may be closed',
        icon: '❄️',
        bestFor: 'Lower altitude treks, cultural tours'
      },
      monsoon: {
        name: 'Monsoon',
        months: 'June to August',
        description: 'Rainy season, lush green landscapes, limited mountain views',
        pros: 'Few tourists, lower prices, lush vegetation',
        cons: 'Leeches, landslides, flight delays',
        icon: '🌧️',
        bestFor: 'Rain-shadow areas like Upper Mustang, cultural tours'
      }
    };
    return seasons[season] || seasons.autumn;
  };

  const currentSeason = formData.startDate ? getSeason(formData.startDate.month()) : 'autumn';
  const seasonInfo = getSeasonInfo(currentSeason);

  return (
    <div className="step-content">
      <h3 className="text-center text-xl font-semibold mb-6">
        <DollarOutlined className="mr-2" />
        Budget & Dates
      </h3>
      
      <Row gutter={[24, 16]}>
        <Col xs={24} md={12}>
          <Card title="Budget Planning" className="mb-6">
            <Form.Item
              label="Select Your Budget Range (per person)"
              name="budgetRange"
              rules={[{ required: true, message: 'Please select a budget range' }]}
            >
              <Select
                onChange={handleBudgetRangeChange}
                value={formData.budgetRange}
                placeholder="Select your budget range"
              >
                {budgetRanges.map(range => (
                  <Option key={range.value} value={range.value}>
                    {range.label} (${range.min} - ${range.max})
                  </Option>
                ))}
              </Select>
            </Form.Item>
            
            {formData.budgetRange && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <Text strong>Your Budget:</Text>
                  <Text strong className="text-lg">${formData.budgetAmount}</Text>
                </div>
                
                <Slider
                  min={budgetRanges.find(r => r.value === formData.budgetRange).min}
                  max={budgetRanges.find(r => r.value === formData.budgetRange).max}
                  value={formData.budgetAmount}
                  onChange={(value) => onInputChange('budgetAmount', value)}
                  tipFormatter={(value) => `$${value}`}
                  className="mb-6"
                />
                
                <div className="bg-gray-50 p-4 rounded">
                  <Text strong>Budget Breakdown:</Text>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span>Accommodation:</span>
                      <span>${Math.round(formData.budgetAmount * 0.3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Meals:</span>
                      <span>${Math.round(formData.budgetAmount * 0.2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Permits & Fees:</span>
                      <span>${Math.round(formData.budgetAmount * 0.15)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Guide & Porter:</span>
                      <span>${Math.round(formData.budgetAmount * 0.25)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transportation:</span>
                      <span>${Math.round(formData.budgetAmount * 0.1)}</span>
                    </div>
                    <Divider className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Total (per person):</span>
                      <span>${formData.budgetAmount}</span>
                    </div>
                  </div>
                  <Text type="secondary" className="text-xs mt-2 block">
                    * This is an estimate. Final pricing will be confirmed based on your exact requirements.
                  </Text>
                </div>
              </div>
            )}
          </Card>
          
          <Card title="Tentative Dates">
            <Form.Item
              label="Preferred Start Date"
              name="startDate"
              rules={[{ required: true, message: 'Please select a start date' }]}
            >
              <DatePicker 
                style={{ width: '100%' }}
                onChange={handleDateChange}
                disabledDate={(current) => {
                  return current && current < dayjs().startOf('day');
                }}
              />
            </Form.Item>
            
            <Form.Item
              label="Trek Duration"
              name="duration"
              rules={[{ required: true, message: 'Please select duration' }]}
            >
              <Select
                onChange={(value) => handleDurationChange(value)}
                value={formData.duration}
                placeholder="Select trek duration"
              >
                <Option value={7}>7 days</Option>
                <Option value={10}>10 days</Option>
                <Option value={14}>14 days</Option>
                <Option value={21}>21 days</Option>
                <Option value={0}>Custom duration</Option>
              </Select>
            </Form.Item>
            
            {formData.duration === 0 && (
              <Form.Item
                label="Custom Duration (days)"
                name="customDuration"
                rules={[{ required: true, message: 'Please enter duration' }]}
              >
                <InputNumber 
                  min={1} 
                  max={30} 
                  style={{ width: '100%' }}
                  onChange={(value) => handleDurationChange(value)}
                  placeholder="Enter number of days"
                />
              </Form.Item>
            )}
            
            {formData.startDate && formData.duration > 0 && (
              <div className="mt-4 p-4 bg-blue-50 rounded">
                <div className="flex items-center mb-2">
                  <CalendarOutlined className="mr-2 text-blue-500" />
                  <Text strong>Your Trek Dates:</Text>
                </div>
                <div className="ml-6">
                  {dayjs(formData.startDate).format('dddd, MMMM D, YYYY')}
                  <br />
                  <span className="ml-4">to</span> {formData.endDate.format('dddd, MMMM D, YYYY')}
                  <div className="mt-1 text-sm text-gray-600">
                    ({formData.duration} days total)
                  </div>
                </div>
              </div>
            )}
            
            {formData.startDate && (
              <div className="mt-4 p-4 bg-green-50 rounded">
                <div className="flex items-center">
                  <InfoCircleOutlined className="mr-2 text-green-500" />
                  <Text strong>Seasonal Information:</Text>
                </div>
                <div className="mt-2">
                  <div className="font-medium">{seasonInfo.icon} {seasonInfo.name} Season ({seasonInfo.months})</div>
                  <div className="text-sm mt-1">{seasonInfo.description}</div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <div className="font-medium text-green-700">Pros:</div>
                      <div className="text-sm">{seasonInfo.pros}</div>
                    </div>
                    <div>
                      <div className="font-medium text-red-700">Considerations:</div>
                      <div className="text-sm">{seasonInfo.cons}</div>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Best for:</span> {seasonInfo.bestFor}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </Col>
        
        <Col xs={24} md={12}>
          <Card 
            title="What's Included" 
            className="h-full"
            bordered={false}
          >
            <div className="space-y-6">
              <div>
                <Title level={5} className="mb-2">Included in Your Trek:</Title>
                <ul className="list-disc pl-5 space-y-2">
                  <li>All necessary trekking permits and TIMS card</li>
                  <li>Accommodation during the trek (twin sharing)</li>
                  <li>All meals during the trek (breakfast, lunch, dinner)</li>
                  <li>Experienced, English-speaking trekking guide</li>
                  <li>Porter service (1 porter for 2 trekkers, max 15kg per trekker)</li>
                  <li>All ground transportation as per itinerary</li>
                  <li>First aid kit and oximeter</li>
                  <li>All government taxes and service charges</li>
                </ul>
              </div>
              
              <Divider className="my-2" />
              
              <div>
                <Title level={5} className="mb-2">Not Included:</Title>
                <ul className="list-disc pl-5 space-y-2">
                  <li>International flights to/from Nepal</li>
                  <li>Nepal entry visa fee</li>
                  <li>Travel insurance (mandatory)</li>
                  <li>Personal expenses (alcoholic drinks, hot showers, battery charging, WiFi, etc.)</li>
                  <li>Tips for guide and porter</li>
                  <li>Meals in Kathmandu (except breakfast)</li>
                  <li>Any other expenses not mentioned in the included section</li>
                </ul>
              </div>
              
              <Divider className="my-2" />
              
              <div className="bg-yellow-50 p-4 rounded">
                <Title level={5} className="mb-2">Payment & Cancellation Policy</Title>
                <ul className="list-disc pl-5 space-y-1">
                  <li>20% deposit required to confirm booking</li>
                  <li>Full payment due 30 days before departure</li>
                  <li>Cancellation 60+ days before departure: Full refund</li>
                  <li>Cancellation 30-60 days before: 50% refund</li>
                  <li>Cancellation less than 30 days: No refund</li>
                  <li>Unused services are non-refundable</li>
                </ul>
                <Text type="secondary" className="text-xs mt-2 block">
                  * We recommend purchasing travel insurance that covers trip cancellation.
                </Text>
              </div>
              
              <div className="bg-blue-50 p-4 rounded mt-4">
                <Title level={5} className="mb-2">Flexible Booking Options</Title>
                <Paragraph>
                  We understand that plans can change. Ask us about our flexible booking options including:
                </Paragraph>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Free date changes up to 30 days before departure</li>
                  <li>Low deposit to secure your booking</li>
                  <li>Payment plans available</li>
                  <li>Group discounts for 4+ people</li>
                </ul>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BudgetDatesStep;
