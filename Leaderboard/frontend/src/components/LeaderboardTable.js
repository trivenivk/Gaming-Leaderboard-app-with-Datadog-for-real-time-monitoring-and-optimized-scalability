import React from 'react';

const LeaderboardTable = ({ scores }) => {
    return (
        <table className="leaderboard-table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Game</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {scores.map((score, index) => (
                    <tr key={score._id}>
                        <td>{index + 1}</td>
                        <td>{score.playerName}</td>
                        <td>{score.game}</td>
                        <td>{score.score}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default LeaderboardTable; 