import Button from '@mui/material/Button';
import Link from 'next/link';

export default function QuestionList({ question }) {

    return (
        <>
            {question.map(({ type, title }, index) => (
                <div key={index} className="p-4 border-b border-gray-300 dark:border-gray-700">
                    <div className="flex-between">
                        <h1 className="text-xl font-semibold mb-2 dark:text-white">{title}</h1>
                        {type === 0 && (
                            <Button
                                variant="outlined"
                                color="warning"
                                style={{ opacity: 0.8, marginLeft: '1rem' }}
                            >
                                <Link href="/">Unlock</Link>
                            </Button>
                        )}
                        {type === 3 && (
                            <Button
                                variant="outlined"
                                color="success"
                                style={{ opacity: 0.8, marginLeft: '1rem' }}
                            >
                                <Link href="/">Correct</Link>
                            </Button>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
}
