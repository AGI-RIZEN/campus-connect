import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { KeyboardAvoidingView } from '@/components/ui/KeyboardSafe';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heart, Send, Smile, X } from 'lucide-react-native';
import { Avatar } from '@/components/ui/Avatar';
import { IconButton } from '@/components/ui/IconButton';
import { Reveal } from '@/components/ui/Reveal';
import { Body, BodyMedium, Caption, H2 } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import { haptic } from '@/lib/haptics';
import { colors, softShadowLg } from '@/lib/theme';
import { timeAgo } from '@/lib/time';
import { listComments, addComment, toggleCommentLike, type Comment } from '@/lib/api/posts';
import { ApiRequestError } from '@/lib/api/client';

type Props = {
  visible: boolean;
  onClose: () => void;
  postId: string;
  onCommentPosted?: () => void;
};

export function CommentsSheet({ visible, onClose, postId, onCommentPosted }: Props) {
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const [items, setItems] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!visible) return;
    setLoading(true);
    listComments(postId)
      .then(setItems)
      .catch((err) => {
        const message = err instanceof ApiRequestError ? err.message : 'Could not load comments';
        toast(message, 'error');
      })
      .finally(() => setLoading(false));
  }, [visible, postId]);

  const toggleCommentLikeLocal = async (id: string) => {
    haptic.select();
    setItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, liked: !c.liked, likesCount: c.liked ? c.likesCount - 1 : c.likesCount + 1 } : c))
    );
    try {
      const result = await toggleCommentLike(id);
      setItems((prev) => prev.map((c) => (c.id === id ? { ...c, liked: result.liked, likesCount: result.likesCount } : c)));
    } catch {
      // Best-effort — leave the optimistic state as-is rather than flicker on a transient failure.
    }
  };

  const handleSend = async () => {
    const value = text.trim();
    if (!value || sending) return;
    setSending(true);
    try {
      const newComment = await addComment(postId, value);
      setItems((prev) => [...prev, newComment]);
      setText('');
      haptic.success();
      onCommentPosted?.();
    } catch (err) {
      const message = err instanceof ApiRequestError ? err.message : 'Could not post your comment';
      toast(message, 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'flex-end' }} behavior="padding">
      <Pressable style={StyleSheet.absoluteFill} className="bg-black/40" onPress={onClose} />
      <View
        style={[softShadowLg, { maxHeight: '78%', paddingBottom: insets.bottom + 12 }]}
        className="bg-white dark:bg-surface-dark rounded-t-[32px]"
      >
        <View className="flex-row items-center justify-between px-5 pt-5 pb-3">
          <View style={{ width: 36 }} />
          <H2>Comments</H2>
          <IconButton size={36} onPress={onClose}>
            <X size={18} color={colors.ink} />
          </IconButton>
        </View>
        <ScrollView className="px-5" style={{ maxHeight: 400 }} showsVerticalScrollIndicator={false}>
          {loading ? (
            <View className="py-8 items-center">
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : items.length === 0 ? (
            <Caption className="text-center py-6">No comments yet — be the first to say something.</Caption>
          ) : (
            items.map((c, i) => (
              <Reveal key={c.id} index={i} step={45}>
                <View className="flex-row mb-4">
                  <Avatar uri={c.author.avatarUrl} name={c.author.fullName} size={36} />
                  <View className="flex-1 ml-3">
                    <View className="flex-row items-center">
                      <BodyMedium>{c.author.fullName}</BodyMedium>
                      <Caption className="ml-2">{timeAgo(c.createdAt)}</Caption>
                    </View>
                    <Body className="mt-0.5">{c.text}</Body>
                    <View className="flex-row items-center mt-1.5">
                      <Pressable onPress={() => toggleCommentLikeLocal(c.id)} className="flex-row items-center mr-4">
                        <Heart size={14} color={c.liked ? colors.danger : colors.textSecondary} fill={c.liked ? colors.danger : 'none'} />
                        <Caption className="ml-1">{c.likesCount}</Caption>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Reveal>
            ))
          )}
        </ScrollView>
        <View className="flex-row items-center px-5 pt-3 pb-1 border-t border-border-light dark:border-border-dark">
          <Pressable className="mr-2" onPress={() => toast('Emoji picker coming soon', 'info')}>
            <Smile size={22} color={colors.textSecondary} />
          </Pressable>
          <View className="flex-1 flex-row items-center bg-background dark:bg-background-dark rounded-full px-4" style={{ height: 44 }}>
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="Add a comment..."
              placeholderTextColor={colors.textSecondary}
              className="flex-1 font-poppins text-body text-text-primary dark:text-text-primary-dark"
            />
          </View>
          <Pressable
            onPress={handleSend}
            disabled={sending}
            style={{ width: 40, height: 40 }}
            className={`rounded-full bg-primary items-center justify-center ml-3 ${sending ? 'opacity-50' : ''}`}
          >
            <Send size={16} color="#fff" />
          </Pressable>
        </View>
      </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
