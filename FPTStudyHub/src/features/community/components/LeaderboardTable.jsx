import React from 'react';
import { getDirectImageUrl } from '../../../utils/imageHelper'; 

// --- COMPONENT RENDER DANH HIỆU TỪ MANAGER ---
const RenderBadges = ({ badges }) => {
  if (!badges || !Array.isArray(badges) || badges.length === 0) {
    return <span style={{ color: '#94A3B8', fontSize: '13px' }}>-</span>;
  }

  // Hàm so sánh chuẩn, không phân biệt hoa thường và khoảng trắng
  const checkBadge = (badgeName) => {
    return badges.some(b => b.trim() === badgeName.trim());
  };

  return (
    <div className="badges-list" style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
      {checkBadge('Trạng Nguyên Lượt Xem') && (
        <span title="Trạng Nguyên Lượt Xem" style={{ background: '#E0F2FE', color: '#0369A1', padding: '4px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
          👁️ Trạng Nguyên
        </span>
      )}
      {checkBadge('Thần Toán Bài làm') && (
        <span title="Thần Toán Bài làm" style={{ background: '#FEF3C7', color: '#B45309', padding: '4px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
          📝 Thần Toán
        </span>
      )}
      {checkBadge('Siêu phẩm hữu ích') && (
        <span title="Siêu phẩm hữu ích" style={{ background: '#DCFCE7', color: '#15803D', padding: '4px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
          📥 Siêu phẩm
        </span>
      )}
    </div>
  );
};

// --- DÒNG DỮ LIỆU CỦA CÁC SINH VIÊN ---
const LeaderboardRow = ({ student }) => {
  const getRankClass = (rank) => {
    if (rank === 1) return 'rank-first';
    if (rank === 2) return 'rank-second';
    if (rank === 3) return 'rank-third';
    return 'rank-normal';
  };

  const isMe = student.currentUser;
  const rowStyle = isMe 
    ? { backgroundColor: '#F0FDF4', borderBottom: '2px solid #BBF7D0' } 
    : { borderBottom: '1px solid #F1F5F9' };

  return (
    <tr style={rowStyle}>
      <td style={{ padding: '16px' }}>
        <span className={`rank-number ${getRankClass(student.rank)}`}>{student.rank}</span>
      </td>
      
      <td style={{ padding: '16px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
             <img src={getDirectImageUrl(student.avatar)} alt={student.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
             {isMe && <span style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', backgroundColor: '#22C55E', borderRadius: '50%', border: '2px solid white' }}></span>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '600', color: isMe ? '#15803D' : '#1E293B' }}>
              {student.name} {isMe && '(Bạn)'}
            </span>
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '13px', color: '#64748B' }}>
              {student.major}
            </span>
          </div>
        </div>
      </td>
      
      <td style={{ padding: '16px', verticalAlign: 'middle' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3B82F6', fontWeight: '600' }}>
            <span title="Total Views">👁️</span> <span style={{ fontSize: '15px' }}>{student.totalViews || 0}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10B981', fontWeight: '600' }}>
            <span title="Total Downloads">⬇️</span> <span style={{ fontSize: '15px' }}>{student.totalDownloads || 0}</span>
          </div>
          {/* ĐÃ KHÔI PHỤC: Số lượng bài Quiz */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#8B5CF6', fontWeight: '600' }}>
            <span title="Quiz Attempts">📝</span> <span style={{ fontSize: '15px' }}>{student.totalQuizAttempts || 0}</span>
          </div>
        </div>
      </td>

      <td style={{ padding: '16px', verticalAlign: 'middle' }}>
         <div style={{ color: '#F97316', fontWeight: 'bold', fontSize: '16px' }}>
           {student.engagementScore?.toLocaleString()} pts
         </div>
      </td>
      
      <td style={{ padding: '16px', verticalAlign: 'middle' }}>
        <RenderBadges badges={student.badges} />
      </td>
    </tr>
  );
};

// --- BẢNG CHÍNH ---
const LeaderboardTable = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#64748B', backgroundColor: 'white', borderRadius: '16px' }}>
        Chưa có dữ liệu tương tác trong khoảng thời gian này.
      </div>
    );
  }

  return (
    <div className="leaderboard-table-card" style={{ overflowX: 'hidden' }}>
      <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse', display: 'table' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #E2E8F0' }}>
            <th style={{ width: '8%', padding: '16px', textAlign: 'left', color: '#64748B', fontWeight: '600' }}>Rank</th>
            <th style={{ width: '25%', padding: '16px', textAlign: 'left', color: '#64748B', fontWeight: '600' }}>Student</th>
            {/* KHÔI PHỤC TIÊU ĐỀ: Stats (V/D/Q) */}
            <th style={{ width: '25%', padding: '16px', textAlign: 'left', color: '#64748B', fontWeight: '600' }}>Stats (V/D/Q)</th> 
            <th style={{ width: '12%', padding: '16px', textAlign: 'left', color: '#64748B', fontWeight: '600' }}>Score</th> 
            <th style={{ width: '30%', padding: '16px', textAlign: 'left', color: '#64748B', fontWeight: '600' }}>Danh Vọng</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => (
            <LeaderboardRow key={student.rank} student={student} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;