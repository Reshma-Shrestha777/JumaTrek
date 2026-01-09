import React from 'react';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="section-header">
        <h2 className="section-title">About Juma Trek</h2>
        <p className="section-subtitle">Your trusted partner for authentic Himalayan adventures since 2009</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Our Story</h3>
          <p style={{ marginBottom: '16px', color: 'var(--muted)' }}>
            Founded by local mountaineer Pemba Sherpa and adventure travel expert Maya Gurung, Juma Trek was born from a shared vision: to show the world Nepal's incredible mountains while supporting the communities that call them home.
          </p>

          <p style={{ marginBottom: '24px', color: 'var(--muted)' }}>
            With over 15 years of experience, we've guided thousands of trekkers safely through Nepal's most spectacular landscapes, from classic tea-house routes to remote wilderness adventures.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            <div style={{ textAlign: 'center', padding: '20px', background: 'var(--cream)', borderRadius: '12px' }}>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--brand)' }}>100%</div>
              <div style={{ color: 'var(--muted)', fontSize: '14px' }}>Local Guides</div>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', background: 'var(--cream)', borderRadius: '12px' }}>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--brand)' }}>24/7</div>
              <div style={{ color: 'var(--muted)', fontSize: '14px' }}>Support</div>
            </div>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Juma Trek Team"
            style={{ width: '100%', borderRadius: '16px', boxShadow: '0 20px 60px var(--shadow-hover)' }}
          />
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '12px' }}>
            <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-dark)' }}>Our expert team of local guides and international coordinators</p>
          </div>
        </div>
      </div>
    </section>
  );
};


export default About;