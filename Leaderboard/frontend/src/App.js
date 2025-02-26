import React, { useState, useEffect } from 'react';
import LeaderboardTable from './components/LeaderboardTable';
import { getScores, addScore } from './services/api';
import './App.css';

function App() {
    const [scores, setScores] = useState([]);
    const [newScore, setNewScore] = useState({
        playerName: '',
        game: '',
        score: ''
    });

    useEffect(() => {
        fetchScores();
    }, []);

    const fetchScores = async () => {
        try {
            const response = await getScores();
            setScores(response.data);
        } catch (error) {
            console.error('Error fetching scores:', error);
            alert('Error fetching scores. Please check console.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate input
        if (!newScore.playerName || !newScore.game || !newScore.score) {
            alert('Please fill in all fields');
            return;
        }

        // Convert score to number
        const scoreData = {
            ...newScore,
            score: Number(newScore.score)
        };

        try {
            console.log('Submitting score:', scoreData);
            const response = await addScore(scoreData);
            console.log('Score added:', response.data);
            
            // Clear form
            setNewScore({ playerName: '', game: '', score: '' });
            
            // Refresh scores
            await fetchScores();
            
            alert('Score added successfully!');
        } catch (error) {
            console.error('Error adding score:', error);
            alert('Error adding score. Please check console.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewScore(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="App">
            <h1>Gaming Leaderboard</h1>
            
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    name="playerName"
                    placeholder="Player Name"
                    value={newScore.playerName}
                    onChange={handleChange}
                    style={{ marginRight: '10px' }}
                />
                <input
                    type="text"
                    name="game"
                    placeholder="Game"
                    value={newScore.game}
                    onChange={handleChange}
                    style={{ marginRight: '10px' }}
                />
                <input
                    type="number"
                    name="score"
                    placeholder="Score"
                    value={newScore.score}
                    onChange={handleChange}
                    style={{ marginRight: '10px' }}
                />
                <button type="submit">Add Score</button>
            </form>

            <LeaderboardTable scores={scores} />
        </div>
    );
}

export default App;
