import React, { useState, useEffect } from 'react';
import { VoteType, Vote } from '@prisma/client';
import { supabase } from '../utils/supabase';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

type ItemType = 'post' | 'comment';

interface VoteCountProps {
    type: VoteType;
    itemId: number;
    itemType: ItemType;
}

const VoteCount: React.FC<VoteCountProps> = ({ type, itemId, itemType }) => {
    const [votes, setVotes] = useState<Vote[]>([]);

    useEffect(() => {
        async function fetchVotes() {
            const { data, error } = await supabase
                .from('Vote')
                .select('*')
                .eq(itemType === 'post' ? 'post_id' : 'comment_id', itemId);

            if (error) {
                console.error('Error fetching votes:', error);
                return;
            }

            setVotes(data || []);
        }

        fetchVotes();
    }, [itemId, itemType]);

    const totalCount = votes.filter((vote) => vote.type === type).length;

    return (
        <div>
            <span className="vote-count">{totalCount}</span>
        </div>
    );
};


const VoteButton: React.FC<{
    type: VoteType;
    itemId: number;
    itemType: ItemType;
    userVotes: Record<string, VoteType>;
    handleVote: (type: VoteType, itemId: number, itemType: ItemType) => void;
}> = ({ type, itemId, itemType, userVotes, handleVote }) => {
    const userVote = userVotes[itemId.toString()];
    const isActive = userVote === type;

    const isUpVote = type === 'UP';

    return (
        <button
            onClick={() => handleVote(type, itemId, itemType)}
            className={`vote-button ${isActive ? 'active' : ''}`}
        >
            {isActive ? (
                isUpVote ? (
                    <FaThumbsUp className="vote-icon fill" />
                ) : (
                    <FaThumbsDown className="vote-icon fill" />
                )
            ) : (
                isUpVote ? (
                    <FaThumbsUp className="vote-icon" />
                ) : (
                    <FaThumbsDown className="vote-icon" />
                )
            )}
            <span className="vote-count">
                <VoteCount type={type} itemId={itemId} itemType={itemType} />
            </span>
        </button>
    );
};

export default VoteButton;
