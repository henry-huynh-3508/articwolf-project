export function isValidInput(input: string) {
  // input must be alpha numeric, input length >0, <100
  return input.match(/^[0-9a-z]+$/) && input.length < 100 && input.length > 0;
}

export interface iAnagramRequest {
  anagramTextA: string;
  anagramTextB: string;
}

export interface iAnagramResult {
  isAnagram: boolean;
  originalTextA: string;
  originalTextB: string;
}

export function createAnagramRequest(texta: string, textb: string) {
  return {
    anagramTextA: texta,
    anagramTextB: textb,
  } as iAnagramRequest;
}
