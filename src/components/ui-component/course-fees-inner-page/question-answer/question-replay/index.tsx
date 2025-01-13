import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import useAuth from 'hooks/useAuth';
import QuestionReplayAccordion, {
  IQuestionDataProps,
  IQuestionProps,
  IReplayStateProps
} from 'ui-component/college-question-page/question-replay-accordion';
import ErrorComponent from 'ui-component/error';
import { postQuestionAnswer, postQuestionAnswerReply } from 'utils/api/course-fees-inner-page/question-answer';
const InnerQuestionReplay: React.FC<IQuestionProps> = ({ profileData, hasError }) => {
  const { user } = useAuth();
  const param = useParams();
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [newReplay, setNewReplay] = useState<string>('');
  const [questionId, setQuestionId] = useState<number>(0);
  const [questionData, setQuestionData] = useState<IQuestionDataProps>({
    collegeUrl: '',
    question: '',
    studentId: '',
    courseName: ''
  });
  const [replay, setReplayState] = useState<IReplayStateProps>({
    answer: '',
    collegeUrl: '',
    courseName: '',
    questionId: 0,
    studentId: ''
  });
  useEffect(() => {
    const data = {
      question: newQuestion,
      collegeUrl: param?.name,
      studentId: user?.id,
      courseName: param?.courseName
    };
    data.courseName && data.collegeUrl && setQuestionData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newQuestion, param?.courseName, param?.name]);

  useEffect(() => {
    const data = {
      answer: newReplay,
      collegeUrl: param?.name,
      courseName: param?.courseName,
      questionId: questionId,
      studentId: user?.id
    };
    data.courseName && data?.collegeUrl && setReplayState(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newReplay, param?.courseName, param?.name, questionId]);
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <QuestionReplayAccordion
          data-test-id="question-reply"
          postQuestionAnswer={postQuestionAnswerReply}
          profileData={profileData}
          postQuestions={postQuestionAnswer}
          newQuestion={newQuestion}
          setNewQuestion={setNewQuestion}
          data={questionData}
          newReply={newReplay}
          setNewReply={setNewReplay}
          replayState={replay}
          setQuestionId={setQuestionId}
        />
      )}
    </>
  );
};

export default InnerQuestionReplay;
