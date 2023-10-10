/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Empty } from "../google/protobuf/empty.js";

export const protobufPackage = "file";

export interface FileInfo {
  fileName: string;
  fileExtension: string;
}

export interface BytesContent {
  fileSize: number;
  buffer: Uint8Array;
  readedByte: number;
  info: FileInfo | undefined;
}

export interface FilePath {
  filePath: string;
}

export const FILE_PACKAGE_NAME = "file";

export interface FileServiceClient {
  fileDownLoad(request: FileInfo): Observable<BytesContent>;

  fileUpLoad(request: Observable<BytesContent>): Empty;

  getFilePath(request: FileInfo): FilePath;
}

export interface FileServiceController {
  fileDownLoad(request: FileInfo): Observable<BytesContent>;

  fileUpLoad(request: Observable<BytesContent>): void;

  getFilePath(request: FileInfo): Promise<FilePath> | Observable<FilePath> | FilePath;
}

export function FileServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["fileDownLoad", "getFilePath"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("FileService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["fileUpLoad"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("FileService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const FILE_SERVICE_NAME = "FileService";
