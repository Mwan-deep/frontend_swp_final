import React from 'react';
import QuizTableRow from './QuizTableRow';

// THÊM onToggleVisibility VÀO TRONG NGOẶC NHỌN Ở DÒNG NÀY:
const QuizTable = ({ quizzes, onStart, onStats, onToggleVisibility }) => {
  return (
    <div className="quiz-table-container">
      <table className="quiz-data-table">
        <thead>
          <tr>
            <th>QUIZ INFORMATION</th>
            <th>STATUS</th>
            <th>CREATED DATE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <QuizTableRow
                key={quiz.id}
                quiz={quiz}
                onStart={onStart}
                onStats={onStats}
                onToggleVisibility={onToggleVisibility} // Bây giờ biến này đã hợp lệ
              />
            ))
          ) : (
            <tr>
              <td colSpan="4" className="table-empty-state">
                No matching quizzes found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QuizTable;