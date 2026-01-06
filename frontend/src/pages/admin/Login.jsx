import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
<<<<<<< HEAD
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Alert,
  Divider,
  Checkbox,
  message,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';

import { adminService } from '../../services/adminApi';

=======
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  Alert, 
  Divider, 
  Checkbox,
  message
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';

>>>>>>> ba1716b091cbc3d24070bbfef176a188a9a4f439
const { Title, Text } = Typography;

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setError('');
<<<<<<< HEAD

    try {
      console.log('Attempting admin login:', values.email);

      const response = await adminService.login(
        values.email,
        values.password
      );

      console.log('Login response:', response);

      if (response?.success && response?.user?.role === 'Admin') {
        message.success('Login successful!');
        // Use window.location.href for a full page reload to ensure proper state initialization
        window.location.href = '/admin';
      } else {
        setError('Access denied. Admin privileges required.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(
        typeof err === 'string' ? err : 'An error occurred during login. Please try again.'
      );
=======
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - replace with actual API call
      if (values.username === 'admin' && values.password === 'admin123') {
        // In a real app, you would store the token in localStorage or httpOnly cookie
        localStorage.setItem('adminToken', 'dummy-jwt-token');
        message.success('Login successful!');
        navigate('/admin');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
>>>>>>> ba1716b091cbc3d24070bbfef176a188a9a4f439
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        padding: '20px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Header */}
=======
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f2f5',
      padding: '20px',
      backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        margin: '0 auto'
      }}>
>>>>>>> ba1716b091cbc3d24070bbfef176a188a9a4f439
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Title level={2} style={{ marginBottom: '8px', color: '#1890ff' }}>
            JumaTrek Admin
          </Title>
<<<<<<< HEAD
          <Text type="secondary">Sign in to your admin account</Text>
        </div>

        <Card
          style={{
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: 'none',
          }}
        >
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
=======
          <Text type="secondary" style={{ fontSize: '16px' }}>
            Sign in to your admin account
          </Text>
        </div>

        <Card 
          className="shadow-lg"
          style={{
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            border: 'none'
          }}
        >
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            className="mb-4"
>>>>>>> ba1716b091cbc3d24070bbfef176a188a9a4f439
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
<<<<<<< HEAD

          {/* Error message */}
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              closable
              style={{ marginTop: '16px' }}
              onClose={() => setError('')}
            />
          )}

          {/* Login Form */}
          <Form
            name="admin-login"
            layout="vertical"
            onFinish={onFinish}
            size="large"
            style={{ marginTop: '24px' }}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                autoComplete="email"
=======
          
          {error && (
            <Alert 
              message={error} 
              type="error" 
              showIcon 
              className="mb-6" 
              closable 
              onClose={() => setError('')}
            />
          )}
          
          <Form
            name="login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
            style={{
              marginTop: '24px'
            }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input 
                prefix={<UserOutlined className="text-gray-400" />} 
                placeholder="Username" 
                autoComplete="username"
>>>>>>> ba1716b091cbc3d24070bbfef176a188a9a4f439
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
<<<<<<< HEAD
                prefix={<LockOutlined />}
=======
                prefix={<LockOutlined className="text-gray-400" />}
                type="password"
>>>>>>> ba1716b091cbc3d24070bbfef176a188a9a4f439
                placeholder="Password"
                autoComplete="current-password"
              />
            </Form.Item>

<<<<<<< HEAD
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
=======
            <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
>>>>>>> ba1716b091cbc3d24070bbfef176a188a9a4f439
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

<<<<<<< HEAD
              <Link to="/admin/forgot-password">Forgot password?</Link>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
=======
              <Link to="/admin/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </Link>
            </div>

            <Form.Item className="mt-6">
              <Button 
                type="primary" 
                htmlType="submit" 
                className="w-full" 
                size="large"
>>>>>>> ba1716b091cbc3d24070bbfef176a188a9a4f439
                loading={loading}
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>
<<<<<<< HEAD

          <Divider>Or</Divider>

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary">
              Having trouble?{' '}
              <Link to="/admin/contact-support">Contact support</Link>
            </Text>
          </div>
        </Card>

        {/* Footer */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '24px',
            fontSize: '12px',
            color: '#888',
          }}
        >
          © {new Date().getFullYear()} JumaTrek. All rights reserved.
=======
          
          <Divider style={{ margin: '24px 0' }}>Or</Divider>
          
          <div style={{ textAlign: 'center' }}>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              Having trouble signing in?{' '}
              <Link to="/admin/contact-support" style={{ color: '#1890ff' }}>
                Contact support
              </Link>
            </Text>
          </div>
        </Card>
        
        <div style={{
          textAlign: 'center',
          marginTop: '32px',
          padding: '16px',
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderRadius: '8px',
          border: '1px solid rgba(0, 0, 0, 0.06)'
        }}>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            © {new Date().getFullYear()} JumaTrek. All rights reserved.
          </Text>
>>>>>>> ba1716b091cbc3d24070bbfef176a188a9a4f439
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
