package pl.training.bank.common.mapper;

import java.util.List;

public interface Mapper {

    <S,T> T map(S source, Class<T> type);

    <S,T> void map(S source, T target);

    <S,T> List<T> map(List<S> source, Class<T> type);

}
