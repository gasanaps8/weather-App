import styled from 'styled-components';
import { Field, Form } from 'formik';

export const Container = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1rem;
    background: ${(props) => props.theme.colors.blue};
    border: 1px solid ${(props) => props.theme.colors.lighterBlue};
    border-radius: 6px;
`;

export const Title = styled.h1`
    text-align: center;
    font-size: 2.5em;
    margin-bottom: 2rem;
    color: ${(props) => props.theme.colors.textPrimary};
`;

export const GeneralInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
    justify-content: center;
`

export const GeneralInfo = styled.h2`
    text-align: center;
    font-weight: 500;
    color: ${(props) => props.theme.colors.textPrimary};
    margin:0;
    margin-bottom:10px;
`;

export const Button = styled.button`
    display: block;
    padding: 0.75rem 2rem;
    border-radius: 999px;
    border: none;
    background: ${(props) => props.theme.colors.lightBlue};;
    color: ${(props) => props.theme.colors.textSecondary};;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover:not(:disabled) {
        background: ${(props) => props.theme.colors.lighterBlue};;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const FormContainer = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 16px;
`;

export const InputRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const CityField = styled(Field)`
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    flex: 1; // takes remaining space
    outline: none;

    &:focus {
        border-color: ${(props) => props.theme.colors.blue};
        box-shadow: 0 0 4px ${(props) => props.theme.colors.lightBlue};
    }
`;

export const SubmitButton = styled.button`
    padding: 9px 12px;
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.colors.lightBlue};
    background-color: ${(props) => props.theme.colors.lighterBlue};
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: ${(props) => props.theme.colors.lightBlue};
    }

    &:disabled {
        background-color: #888;
        cursor: not-allowed;
    }

    i {
        font-size: 1rem;
    }
`;

export const ErrorText = styled.p`
    color: #dc2626;
    font-size: 0.9rem;
    margin-top: 4px;
    margin-left: 8px;
`;

export const Dropdown = styled.select`
    display: block;
    margin: 1rem auto;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: 1px solid #cbd5e1;
    font-size: 1rem;
    cursor: pointer;
`;

export const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 12px;
    margin: 1rem 0;
`;

