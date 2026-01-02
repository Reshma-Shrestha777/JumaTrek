import React from 'react';
import { Row, Col, Card, Form, Checkbox, Typography, Divider, Select } from 'antd';
import { CarOutlined, SafetyOutlined, HeartOutlined, ToolOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Text, Paragraph } = Typography;

const ServicesTransportStep = ({ 
  formData, 
  onInputChange, 
  transportOptions 
}) => {
  return (
    <div className="step-content">
      <h3 className="text-center text-xl font-semibold mb-6">
        <CarOutlined className="mr-2" />
        Services & Transport
      </h3>
      
      <Row gutter={[24, 16]}>
        <Col xs={24} md={12}>
          <Card title="Guides & Porters" className="mb-6">
            <Form.Item 
              name="guideRequired"
              valuePropName="checked"
              className="mb-4"
            >
              <Checkbox 
                checked={formData.guideRequired}
                onChange={(e) => onInputChange('guideRequired', e.target.checked)}
              >
                <div>
                  <div className="font-medium">Professional Guide</div>
                  <Text type="secondary" className="text-sm">
                    Experienced, English-speaking guide (Highly Recommended)
                  </Text>
                </div>
              </Checkbox>
            </Form.Item>
            
            {formData.guideRequired && (
              <div className="ml-6 mb-4 p-3 bg-blue-50 rounded">
                <Text strong>Guide Services Include:</Text>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Route navigation and local knowledge</li>
                  <li>Cultural and natural history information</li>
                  <li>Assistance with teahouse bookings</li>
                  <li>First aid and emergency support</li>
                  <li>Communication with local communities</li>
                </ul>
              </div>
            )}
            
            <Form.Item 
              name="porterRequired"
              valuePropName="checked"
              className="mt-6 mb-4"
            >
              <Checkbox 
                checked={formData.porterRequired}
                onChange={(e) => onInputChange('porterRequired', e.target.checked)}
              >
                <div>
                  <div className="font-medium">Porter Service</div>
                  <Text type="secondary" className="text-sm">
                    1 porter for every 2 trekkers (max 15kg per trekker)
                  </Text>
                </div>
              </Checkbox>
            </Form.Item>
            
            {formData.porterRequired && (
              <div className="ml-6 p-3 bg-green-50 rounded">
                <Text strong>Porter Information:</Text>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Maximum load: 25kg per porter (including their own gear)</li>
                  <li>Provided with proper clothing and equipment</li>
                  <li>Insured for medical and emergency evacuation</li>
                  <li>Fair wages and working conditions</li>
                </ul>
                <Text type="secondary" className="text-xs mt-2 block">
                  * We strictly follow IPPG (International Porter Protection Group) guidelines
                </Text>
              </div>
            )}
          </Card>
          
          <Card title="Transportation" className="mb-6">
            <Form.Item
              label="Transportation Preferences"
              name="transportation"
              rules={[{ required: true, message: 'Please select at least one option' }]}
            >
              <Select
                mode="multiple"
                placeholder="Select preferred transportation methods"
                onChange={(values) => onInputChange('transportation', values)}
                value={formData.transportation}
                className="w-full"
              >
                {transportOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            
            <div className="bg-blue-50 p-4 rounded mt-4">
              <Text strong>Transportation Notes:</Text>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                {formData.transportation?.includes('flight') && (
                  <li>Domestic flights are weather-dependent and may be delayed or canceled</li>
                )}
                {formData.transportation?.includes('helicopter') && (
                  <li>Helicopter services are subject to weather conditions and availability</li>
                )}
                <li>Road conditions in mountainous areas can be challenging</li>
                <li>Travel times are approximate and may vary</li>
              </ul>
            </div>
          </Card>
          
          <Card title="Additional Services">
            <Form.Item 
              name="insuranceRequired"
              valuePropName="checked"
              className="mb-4"
            >
              <Checkbox 
                checked={formData.insuranceRequired}
                onChange={(e) => onInputChange('insuranceRequired', e.target.checked)}
              >
                <div>
                  <div className="font-medium">Travel Insurance</div>
                  <Text type="secondary" className="text-sm">
                    Emergency medical and evacuation coverage (Required for high-altitude treks)
                  </Text>
                </div>
              </Checkbox>
            </Form.Item>
            
            {formData.insuranceRequired && (
              <div className="ml-6 mb-4 p-3 bg-yellow-50 rounded">
                <Text strong>Insurance Requirements:</Text>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Minimum coverage: $100,000 for emergency evacuation</li>
                  <li>Must cover trekking up to 6,000m</li>
                  <li>24/7 emergency assistance</li>
                  <li>Trip cancellation and interruption coverage recommended</li>
                </ul>
              </div>
            )}
            
            <Form.Item 
              name="equipmentRental"
              valuePropName="checked"
              className="mt-4"
            >
              <Checkbox 
                checked={formData.equipmentRental}
                onChange={(e) => onInputChange('equipmentRental', e.target.checked)}
              >
                Rent Trekking Equipment
              </Checkbox>
            </Form.Item>
            
            {formData.equipmentRental && (
              <div className="ml-6 mt-2 p-3 bg-gray-50 rounded">
                <Text strong>Available for Rent:</Text>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <Checkbox>Sleeping Bag (-20°C)</Checkbox>
                    <div className="text-xs text-gray-500 ml-6">$3/day</div>
                  </div>
                  <div>
                    <Checkbox>Down Jacket</Checkbox>
                    <div className="text-xs text-gray-500 ml-6">$2/day</div>
                  </div>
                  <div>
                    <Checkbox>Trekking Poles (pair)</Checkbox>
                    <div className="text-xs text-gray-500 ml-6">$2/day</div>
                  </div>
                  <div>
                    <Checkbox>Duffel Bag (80L)</Checkbox>
                    <div className="text-xs text-gray-500 ml-6">$1/day</div>
                  </div>
                </div>
                <Text type="secondary" className="text-xs mt-2 block">
                  * Equipment is subject to availability. Please confirm your rental items in advance.
                </Text>
              </div>
            )}
          </Card>
        </Col>
        
        <Col xs={24} md={12}>
          <Card 
            title="Why Choose Our Services?" 
            className="h-full"
            bordered={false}
          >
            <div className="space-y-6">
              <div className="flex items-start">
                <SafetyOutlined className="text-blue-500 text-xl mr-3 mt-1" />
                <div>
                  <Text strong className="text-lg">Safety First</Text>
                  <Paragraph className="mt-1">
                    Our guides are trained in wilderness first aid and carry comprehensive first aid kits. 
                    We monitor altitude sickness symptoms and have emergency evacuation plans in place.
                  </Paragraph>
                </div>
              </div>
              
              <Divider className="my-2" />
              
              <div className="flex items-start">
                <HeartOutlined className="text-red-500 text-xl mr-3 mt-1" />
                <div>
                  <Text strong className="text-lg">Responsible Tourism</Text>
                  <Paragraph className="mt-1">
                    We are committed to responsible tourism practices that benefit local communities and 
                    minimize environmental impact. We follow Leave No Trace principles and ensure fair 
                    treatment and proper equipment for all our staff.
                  </Paragraph>
                </div>
              </div>
              
              <Divider className="my-2" />
              
              <div className="flex items-start">
                <ToolOutlined className="text-orange-500 text-xl mr-3 mt-1" />
                <div>
                  <Text strong className="text-lg">Quality Equipment</Text>
                  <Paragraph className="mt-1">
                    We use high-quality, well-maintained equipment for all our treks. Tents, sleeping bags, 
                    and other gear are regularly inspected and replaced as needed to ensure your comfort and safety.
                  </Paragraph>
                </div>
              </div>
              
              <Divider className="my-2" />
              
              <div className="bg-yellow-50 p-4 rounded">
                <Text strong>Important Notes:</Text>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Travel insurance with emergency evacuation coverage is mandatory for all treks above 3,000m</li>
                  <li>Porter weight limit is strictly 25kg per porter (including their own gear)</li>
                  <li>We provide one guide for every 4-6 trekkers (smaller groups available)</li>
                  <li>All guides speak English and local languages</li>
                  <li>24/7 support from our local office in Kathmandu</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded mt-4">
                <Text strong>Need Assistance?</Text>
                <Paragraph className="mt-1">
                  Our team is available to help you choose the right services for your trek. 
                  Contact us for personalized recommendations based on your specific needs and preferences.
                </Paragraph>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ServicesTransportStep;
