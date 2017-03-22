/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description VSTS interface for query results
 */
interface IWiqlResult {
    wiql?: string;
    error?: string;
}

export {IWiqlResult}