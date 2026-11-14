import React, { useState } from 'react';
import { Modal, Pressable, TextInput, View } from 'react-native';
import { KeyboardAvoidingView } from '@/components/ui/KeyboardSafe';
import { H2, Body } from '@/components/ui/Text';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';
import { colors } from '@/lib/theme';

type Props = {
  visible: boolean;
  title: string;
  description: string;
  placeholder?: string;
  quickReasons?: string[];
  submitting?: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
};

/** Bottom sheet asking the admin to type a reason before a reject/ban action proceeds. */
export function ReasonSheet({
  visible,
  title,
  description,
  placeholder = 'Explain why, so the user understands…',
  quickReasons = [],
  submitting,
  onClose,
  onSubmit,
}: Props) {
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (!reason.trim() || submitting) return;
    onSubmit(reason.trim());
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <Pressable className="flex-1 bg-black/40 justify-end" onPress={onClose}>
        <Pressable className="bg-white dark:bg-surface-dark rounded-t-[32px] px-screen pt-6 pb-10">
          <H2>{title}</H2>
          <Body className="mt-1.5 mb-4 text-text-secondary dark:text-text-secondary-dark">{description}</Body>

          {quickReasons.length > 0 && (
            <View className="flex-row flex-wrap mb-3">
              {quickReasons.map((r) => (
                <Pressable
                  key={r}
                  onPress={() => setReason(r)}
                  className="rounded-full border border-border-light dark:border-border-dark px-3.5 py-2 mr-2 mb-2"
                >
                  <Body className="text-caption">{r}</Body>
                </Pressable>
              ))}
            </View>
          )}

          <View className="rounded-input bg-background dark:bg-background-dark border border-border-light dark:border-border-dark px-4 mb-5">
            <TextInput
              placeholder={placeholder}
              placeholderTextColor={colors.textSecondary}
              value={reason}
              onChangeText={setReason}
              multiline
              textAlignVertical="top"
              className="py-3.5 font-poppins text-body text-text-primary dark:text-text-primary-dark"
              style={{ minHeight: 80 }}
            />
          </View>

          <View className="flex-row">
            <SecondaryButton label="Cancel" className="flex-1 mr-2" onPress={onClose} />
            <PrimaryButton
              label={submitting ? 'Submitting…' : 'Submit'}
              className="flex-1 justify-center"
              disabled={!reason.trim() || submitting}
              onPress={handleSubmit}
            />
          </View>
        </Pressable>
      </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}
