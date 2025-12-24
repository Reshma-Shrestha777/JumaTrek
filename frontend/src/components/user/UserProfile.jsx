import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaUserCircle, FaSignOutAlt, FaUserCog } from 'react-icons/fa';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) return null;

  // Get user initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="user-profile" ref={dropdownRef}>
      <button 
        className="user-profile-button"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {user.avatar ? (
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="user-avatar"
          />
        ) : (
          <div className="user-avatar-initials">
            {getInitials(user.name || user.email)}
          </div>
        )}
        <span className="user-name">
          {user.name || user.email.split('@')[0]}
        </span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          <Link 
            to="/profile" 
            className="dropdown-item"
            onClick={() => setIsOpen(false)}
          >
            <FaUserCog className="dropdown-icon" />
            <span>Profile</span>
          </Link>
          <button 
            className="dropdown-item"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="dropdown-icon" />
            <span>Logout</span>
          </button>
        </div>
      )}

      <style jsx>{`
        .user-profile {
          position: relative;
          display: inline-block;
          margin-left: 15px;
        }

        .user-profile-button {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          color: #4a6fa5;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 20px;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .user-profile-button:hover {
          background-color: rgba(74, 111, 165, 0.1);
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-right: 8px;
          object-fit: cover;
        }

        .user-avatar-initials {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #4a6fa5;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 8px;
          font-weight: bold;
          font-size: 12px;
        }

        .user-name {
          margin-right: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 120px;
        }

        .dropdown-arrow {
          font-size: 10px;
          transition: transform 0.2s ease;
        }

        .dropdown-arrow.open {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          min-width: 200px;
          z-index: 1000;
          margin-top: 8px;
          overflow: hidden;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 10px 16px;
          background: none;
          border: none;
          text-align: left;
          color: #333;
          cursor: pointer;
          transition: background-color 0.2s ease;
          text-decoration: none;
          font-size: 14px;
        }

        .dropdown-item:hover {
          background-color: #f5f7fa;
        }

        .dropdown-icon {
          margin-right: 10px;
          color: #666;
          width: 16px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .user-profile {
            width: 100%;
            margin: 10px 0;
          }

          .user-profile-button {
            width: 100%;
            justify-content: space-between;
            padding: 12px 16px;
          }

          .dropdown-menu {
            position: static;
            width: 100%;
            margin-top: 4px;
            box-shadow: none;
            border: 1px solid #eee;
          }
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
