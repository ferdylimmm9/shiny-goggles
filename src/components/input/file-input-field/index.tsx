import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  MS_EXCEL_MIME_TYPE,
} from '@mantine/dropzone';
import { MicrosoftExcelLogo, X } from '@phosphor-icons/react';
import { Download2Icon } from 'assets/svg';
import Text from 'components/text';
import React from 'react';
import { useController } from 'react-hook-form';
import { color } from 'styles/color';

export interface FileInputProps extends Omit<DropzoneProps, 'onDrop'> {
  type: 'files';
  name: string;
  label?: string;
}

const maxSize = 10 * 1024 ** 2;

export default function FileInputField(props: FileInputProps) {
  const { name, type, label, ...rest } = props;
  const { field, fieldState } = useController({
    name,
  });

  const error = fieldState.error?.message;
  const onRemove = React.useCallback(
    (index: number) => {
      const files: FileWithPath[] = field.value || [];
      files.splice(index, 1);
      field.onChange(files);
    },
    [field],
  );

  const preview = !!field.value?.length && (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        flexWrap: 'wrap',
        marginTop: 8,
      }}
    >
      {field.value.map((file: FileWithPath, index) => {
        return (
          <div
            key={file.path}
            style={{
              width: 64,
              height: 128,
              position: 'relative',
            }}
          >
            <X
              color={color.red50}
              cursor="pointer"
              size={16}
              onClick={() => {
                onRemove(index);
              }}
              style={{
                position: 'absolute',
                top: -8,
                right: -8,
              }}
            />
            <MicrosoftExcelLogo size={64} />
            <Text textVariant="caption1" c={color.neutral70}>
              {file.name}
            </Text>
          </div>
        );
      })}
    </div>
  );
  const labelComponent = label && (
    <Text textVariant="body3" fontWeightVariant="semibold" mb={4}>
      {label}
    </Text>
  );

  const errorComponent = error && (
    <Text
      textVariant="caption1"
      fontWeightVariant="light"
      c={color.red50}
      mt={4}
    >
      {error}
    </Text>
  );
  return (
    <>
      <div>
        {labelComponent}
        {!field.value.length && (
          <>
            <Dropzone
              {...rest}
              maxFiles={1}
              onDrop={(files) => {
                //append
                field.onChange(files);
              }}
              maxSize={maxSize}
              accept={MS_EXCEL_MIME_TYPE}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Download2Icon />
                <Text textVariant="body3" c={color.neutral70}>
                  Drag and Drop{' '}
                  <Text span textVariant="body2" c="#078FE9">
                    Choose file
                  </Text>{' '}
                  to Upload
                </Text>
                <Text
                  c={color.neutral70}
                  size="sm"
                  mt={8}
                  textVariant="caption1"
                >
                  File Supported: CSV, XLSX
                </Text>
              </div>
            </Dropzone>
            <Text
              mt={4}
              textVariant="caption1"
              fontWeightVariant="light"
              c={color.neutral70}
            >
              Maximum size: {maxSize / 1024 ** 2} MB
            </Text>
            {errorComponent}
          </>
        )}
        {preview}
      </div>
    </>
  );
}
