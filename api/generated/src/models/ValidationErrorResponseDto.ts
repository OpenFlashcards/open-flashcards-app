/* tslint:disable */
/* eslint-disable */
/**
 * Open Flashcards API
 * Open Flashcards API
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ValidationErrorResponseDto
 */
export interface ValidationErrorResponseDto {
    /**
     * HTTP status code
     * @type {number}
     * @memberof ValidationErrorResponseDto
     */
    statusCode: number;
    /**
     * Error message
     * @type {object}
     * @memberof ValidationErrorResponseDto
     */
    message: object;
    /**
     * Error type
     * @type {string}
     * @memberof ValidationErrorResponseDto
     */
    error: string;
}

/**
 * Check if a given object implements the ValidationErrorResponseDto interface.
 */
export function instanceOfValidationErrorResponseDto(value: object): value is ValidationErrorResponseDto {
    if (!('statusCode' in value) || value['statusCode'] === undefined) return false;
    if (!('message' in value) || value['message'] === undefined) return false;
    if (!('error' in value) || value['error'] === undefined) return false;
    return true;
}

export function ValidationErrorResponseDtoFromJSON(json: any): ValidationErrorResponseDto {
    return ValidationErrorResponseDtoFromJSONTyped(json, false);
}

export function ValidationErrorResponseDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ValidationErrorResponseDto {
    if (json == null) {
        return json;
    }
    return {
        
        'statusCode': json['statusCode'],
        'message': json['message'],
        'error': json['error'],
    };
}

export function ValidationErrorResponseDtoToJSON(json: any): ValidationErrorResponseDto {
    return ValidationErrorResponseDtoToJSONTyped(json, false);
}

export function ValidationErrorResponseDtoToJSONTyped(value?: ValidationErrorResponseDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'statusCode': value['statusCode'],
        'message': value['message'],
        'error': value['error'],
    };
}

