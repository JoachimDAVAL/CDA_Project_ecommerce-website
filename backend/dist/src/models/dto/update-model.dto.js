"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateModelDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_model_dto_1 = require("./create-model.dto");
class UpdateModelDto extends (0, mapped_types_1.PartialType)(create_model_dto_1.CreateModelDto) {
}
exports.UpdateModelDto = UpdateModelDto;
//# sourceMappingURL=update-model.dto.js.map