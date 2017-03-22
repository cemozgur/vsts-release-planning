/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description Interface for the validation message for the front-end
 */
interface IValidationMessage {
    success: boolean;
    error?: string;
}

export {IValidationMessage};