import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const stormImg = '/storm.png';
const excaliburImg = '/excalibur.png';
const tableNodesImg = '/table_nodes.png';

const LandingPage = () => {
    const navigate = useNavigate();
    const [phase, setPhase] = useState(0); // 0: Storm, 1: Excalibur, 2: Round Table, 3: Final Call

    useEffect(() => {
        if (phase < 2) {
            const timer = setTimeout(() => {
                setPhase(prev => prev + 1);
            }, 3500);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    const phases = [
        {
            title: "Phase I // The Gathering",
            subtitle: "A digital storm approaches. The old world dissipates.",
            image: stormImg,
            color: "rgba(153, 27, 27, 0.4)"
        },
        {
            title: "Phase II // The Impact",
            subtitle: "Code forged into steel. Logic into sovereignty.",
            image: excaliburImg,
            color: "rgba(201, 168, 76, 0.4)"
        },
        {
            title: "Phase III // The Seat",
            subtitle: "Your place at the Table is prepared.",
            image: tableNodesImg,
            color: "rgba(255, 255, 255, 0.4)"
        }
    ];

    const current = phases[phase] || phases[2];

    return (
        <div style={{ 
            height: '100vh', 
            width: '100vw', 
            backgroundColor: '#000', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Layer with Animation */}
            <div 
                key={phase}
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${current.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'opacity 1.5s ease-in-out, transform 8s linear',
                    opacity: 0.7,
                    transform: 'scale(1.1)',
                    animation: 'zoomIn 8s linear infinite alternate'
                }}
            />

            {/* Cinematic Overlay */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                textAlign: 'center',
                maxWidth: '600px'
            }}>
                <div key={`text-${phase}`} className="fade-in" style={{ animationDuration: '2s' }}>
                    <p className="mono gold-text tracking-[0.8em]" style={{ fontSize: '0.7rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
                        {current.title}
                    </p>
                    <div style={{ 
                        width: '200px', 
                        height: '1px', 
                        background: `linear-gradient(90deg, transparent, ${current.color}, transparent)`, 
                        margin: '0 auto 2rem' 
                    }}></div>
                    
                    <h2 className="serif silver-text" style={{ fontSize: '1.5rem', opacity: 0.9, letterSpacing: '0.2em' }}>
                        {current.subtitle}
                    </h2>

                    {phase === 2 && (
                        <button 
                            onClick={() => navigate('/join')}
                            className="btn-sovereign"
                            style={{ 
                                marginTop: '4rem', 
                                padding: '1.2rem 3rem',
                                animation: 'glow-pulse 2s infinite'
                            }}
                        >
                            Enter The Watch
                        </button>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes zoomIn {
                    from { transform: scale(1); }
                    to { transform: scale(1.1); }
                }
                .fade-in {
                    animation: fadeIn 2s forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes glow-pulse {
                    0%, 100% { box-shadow: 0 0 10px rgba(201, 168, 76, 0.4); }
                    50% { box-shadow: 0 0 30px rgba(201, 168, 76, 0.8); }
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
